import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { photoInfo } from "./photo";

export type LightboxItem = { src: string; alt: string };
type Ctx = { open: (items: LightboxItem[], index: number) => void };
const LightboxContext = createContext<Ctx | null>(null);

export function useLightbox(): Ctx | null {
  return useContext(LightboxContext);
}

const MAX = 5;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Accessible fullscreen photo viewer. Radix Dialog gives focus trap, Esc to
 * close and aria-modal. Gestures (hand-rolled, Pointer Events): pinch-zoom,
 * double-tap / double-click zoom, drag to pan when zoomed, swipe left/right
 * between photos when not zoomed, swipe down to close. Keyboard: ←/→, +/−, 0.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const open = useCallback((next: LightboxItem[], i: number) => {
    setItems(next);
    setIndex(i);
    setOpen(true);
  }, []);
  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <Dialog.Root open={isOpen} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100]" style={{ background: "rgba(0,0,0,0.96)" }} />
          <Dialog.Content
            className="fixed inset-0 z-[101] flex flex-col text-white outline-none"
            aria-describedby={undefined}
          >
            {isOpen && items[index] ? (
              <Viewer
                items={items}
                index={index}
                setIndex={setIndex}
                close={() => setOpen(false)}
              />
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </LightboxContext.Provider>
  );
}

function Viewer({
  items,
  index,
  setIndex,
  close,
}: {
  items: LightboxItem[];
  index: number;
  setIndex: (i: number) => void;
  close: () => void;
}) {
  const item = items[index];
  const info = photoInfo(item.src);
  const [t, setT] = useState({ s: 1, x: 0, y: 0 });
  const tRef = useRef(t);
  tRef.current = t;
  const stage = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    startDist?: number;
    startS?: number;
    startX: number;
    startY: number;
    tx: number;
    ty: number;
    moved: boolean;
  } | null>(null);
  const lastTap = useRef(0);
  const [hiResLoaded, setHiResLoaded] = useState(false);

  const count = items.length;
  const go = useCallback(
    (d: number) => {
      if (count < 2) return;
      setIndex((index + d + count) % count);
    },
    [count, index, setIndex],
  );
  useEffect(() => {
    setT({ s: 1, x: 0, y: 0 });
    setHiResLoaded(false);
  }, [index]);

  const zoomAt = useCallback((s: number, cx = 0, cy = 0) => {
    const cur = tRef.current;
    const ns = clamp(s, 1, MAX);
    if (ns === 1) return setT({ s: 1, x: 0, y: 0 });
    // keep the point under (cx, cy) (relative to stage center) fixed
    const k = ns / cur.s;
    setT({ s: ns, x: cx - (cx - cur.x) * k, y: cy - (cy - cur.y) * k });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") zoomAt(tRef.current.s * 1.5);
      else if (e.key === "-") zoomAt(tRef.current.s / 1.5);
      else if (e.key === "0") zoomAt(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, zoomAt]);

  const rel = (x: number, y: number) => {
    const r = stage.current!.getBoundingClientRect();
    return { x: x - (r.left + r.width / 2), y: y - (r.top + r.height / 2) };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    const cur = tRef.current;
    if (pts.length === 2) {
      gesture.current = {
        startDist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        startS: cur.s,
        startX: (pts[0].x + pts[1].x) / 2,
        startY: (pts[0].y + pts[1].y) / 2,
        tx: cur.x,
        ty: cur.y,
        moved: true,
      };
    } else if (pts.length === 1) {
      gesture.current = { startX: e.clientX, startY: e.clientY, tx: cur.x, ty: cur.y, moved: false };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;
    const pts = [...pointers.current.values()];
    if (pts.length >= 2 && g.startDist) {
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const ns = clamp((g.startS ?? 1) * (d / g.startDist), 1, MAX);
      const c = rel(g.startX, g.startY);
      const k = ns / (g.startS ?? 1);
      setT({ s: ns, x: c.x - (c.x - g.tx) * k, y: c.y - (c.y - g.ty) * k });
      return;
    }
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) g.moved = true;
    if (tRef.current.s > 1) setT({ s: tRef.current.s, x: g.tx + dx, y: g.ty + dy });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const g = gesture.current;
    const wasMulti = pointers.current.size > 1;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size > 0) return;
    gesture.current = null;
    if (!g || wasMulti || g.startDist) return;
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (tRef.current.s === 1 && g.moved) {
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
      return;
    }
    if (!g.moved && e.pointerType !== "mouse") {
      const now = Date.now();
      if (now - lastTap.current < 300) {
        const c = rel(e.clientX, e.clientY);
        zoomAt(tRef.current.s > 1 ? 1 : 2.5, c.x, c.y);
        lastTap.current = 0;
      } else lastTap.current = now;
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    const c = rel(e.clientX, e.clientY);
    zoomAt(tRef.current.s * (e.deltaY < 0 ? 1.2 : 1 / 1.2), c.x, c.y);
  };

  const btn =
    "grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white";
  return (
    <>
      <div className="flex items-center justify-between gap-2 p-3">
        <Dialog.Title className="truncate text-sm text-white/80">
          {item.alt}
          {count > 1 ? <span className="ml-2 text-white/50">{index + 1} / {count}</span> : null}
        </Dialog.Title>
        <div className="flex shrink-0 gap-2">
          <button type="button" className={btn} aria-label="Zoom out" onClick={() => zoomAt(t.s / 1.5)}>
            <ZoomOut className="size-5" />
          </button>
          <button type="button" className={btn} aria-label="Zoom in" onClick={() => zoomAt(t.s * 1.5)}>
            <ZoomIn className="size-5" />
          </button>
          <Dialog.Close className={btn} aria-label="Close photo viewer">
            <X className="size-5" />
          </Dialog.Close>
        </div>
      </div>
      <div
        ref={stage}
        className="relative flex-1 touch-none overflow-hidden select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onDoubleClick={(e) => {
          const c = rel(e.clientX, e.clientY);
          zoomAt(t.s > 1 ? 1 : 2.5, c.x, c.y);
        }}
      >
        <img
          key={item.src}
          src={hiResLoaded || !info ? (info?.zoom ?? item.src) : item.src}
          alt={item.alt}
          draggable={false}
          className="absolute inset-0 m-auto max-h-full max-w-full object-contain"
          style={{
            transform: `translate(${t.x}px, ${t.y}px) scale(${t.s})`,
            transition: pointers.current.size ? "none" : "transform 150ms ease-out",
            cursor: t.s > 1 ? "grab" : "zoom-in",
          }}
        />
        {info && !hiResLoaded ? (
          <img
            src={info.zoom}
            alt=""
            aria-hidden
            className="hidden"
            onLoad={() => setHiResLoaded(true)}
          />
        ) : null}
        {count > 1 ? (
          <>
            <button type="button" className={`${btn} absolute top-1/2 left-3 -translate-y-1/2`} aria-label="Previous photo" onClick={() => go(-1)}>
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" className={`${btn} absolute top-1/2 right-3 -translate-y-1/2`} aria-label="Next photo" onClick={() => go(1)}>
              <ChevronRight className="size-6" />
            </button>
          </>
        ) : null}
      </div>
      <p className="p-3 text-center text-xs text-white/60">
        Pinch or double-tap to zoom. Swipe for the next photo. Esc to close.
      </p>
    </>
  );
}
