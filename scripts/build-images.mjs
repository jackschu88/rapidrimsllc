#!/usr/bin/env node
/**
 * Offline photo pipeline (run by hand: `node scripts/build-images.mjs`).
 * Originals in public/work/*.jpg are never modified. Outputs:
 *   public/work/zoom/<name>.webp   long edge ~2800px for the lightbox
 *     (Lanczos3 resample + mild unsharp only; no generative/AI fill, so the
 *      photos show exactly what the real job looked like)
 *   public/work/r/<name>-<w>.{avif,webp}  responsive page thumbnails
 *   src/lib/photo-manifest.json    dimensions for width/height + srcset
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public/work");
const ZOOM_LONG = 2800;
const WIDTHS = [480, 960, 1440];
const SKIP = new Set(["og-bg.jpg"]);

await mkdir(join(src, "zoom"), { recursive: true });
await mkdir(join(src, "r"), { recursive: true });
const manifest = {};
const report = [];
for (const file of (await readdir(src)).filter((f) => f.endsWith(".jpg")).sort()) {
  if (SKIP.has(file)) continue;
  const name = file.replace(/\.jpg$/, "");
  const input = join(src, file);
  const meta = await sharp(input).rotate().metadata();
  const w0 = meta.autoOrient?.width ?? meta.width;
  const h0 = meta.autoOrient?.height ?? meta.height;
  const scale = ZOOM_LONG / Math.max(w0, h0);
  const zw = Math.round(w0 * Math.max(scale, 1));
  const zh = Math.round(h0 * Math.max(scale, 1));
  const zoomPath = join(src, "zoom", `${name}.webp`);
  await sharp(input)
    .rotate()
    .resize(zw, zh, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 1.2 })
    .webp({ quality: 84, effort: 5 })
    .toFile(zoomPath);
  const widths = WIDTHS.filter((w) => w < w0).concat(w0 > WIDTHS.at(-1) ? [] : [w0]);
  const uniq = [...new Set(widths)].sort((a, b) => a - b);
  let thumbBytes = 0;
  for (const w of uniq) {
    const base = sharp(input).rotate().resize({ width: w, kernel: "lanczos3" });
    const a = join(src, "r", `${name}-${w}.avif`);
    const b = join(src, "r", `${name}-${w}.webp`);
    await base.clone().avif({ quality: 55, effort: 5 }).toFile(a);
    await base.clone().webp({ quality: 78 }).toFile(b);
    if (w === 960 || w === uniq.at(-1)) thumbBytes = (await stat(b)).size;
  }
  manifest[`/work/${file}`] = { w: w0, h: h0, zoom: `/work/zoom/${name}.webp`, zw, zh, widths: uniq, base: `/work/r/${name}` };
  report.push({ file, orig: `${w0}x${h0} ${(await stat(input)).size}B`, zoom: `${zw}x${zh} ${(await stat(zoomPath)).size}B`, thumb960webp: `${thumbBytes}B` });
}
await writeFile(join(root, "src/lib/photo-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.table(report);
