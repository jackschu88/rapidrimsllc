#!/usr/bin/env node
// Printable QR for the review page: node scripts/make-review-qr.mjs [outDir]
import QRCode from "qrcode";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
const url = "https://www.rapidrimslv.com/review?src=qr";
const out = process.argv[2] ?? "public";
await mkdir(out, { recursive: true });
const opts = { errorCorrectionLevel: "M", margin: 4, color: { dark: "#000000", light: "#ffffff" } };
await QRCode.toFile(join(out, "review-qr.png"), url, { ...opts, width: 1200 });
await writeFile(join(out, "review-qr.svg"), await QRCode.toString(url, { ...opts, type: "svg" }));
console.log(`QR for ${url} -> ${out}/review-qr.{png,svg}`);
