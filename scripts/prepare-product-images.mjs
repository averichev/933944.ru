import { createHash } from "node:crypto";
import { access, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const sourceDir = path.join(root, "app/assets/products");
const outputDir = path.join(root, "app/assets/products-watermarked");
const manifestPath = path.join(outputDir, "manifest.json");
// Include this script in the cache key so changes to the watermark regenerate images.
const recipe = await readFile(fileURLToPath(import.meta.url));
const files = (await readdir(sourceDir, { recursive: true }))
  .filter(file => /\.jpg$/i.test(file)).sort();
let previous = {};
try {
  previous = JSON.parse(await readFile(manifestPath, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const manifest = {};
let updated = 0;
for (const file of files) {
  const input = await readFile(path.join(sourceDir, file));
  const hash = createHash("sha256").update(recipe).update(sharp.versions.sharp)
    .update(input).digest("hex");
  const outputPath = path.join(outputDir, file);
  manifest[file] = hash;
  if (previous[file] === hash) {
    try {
      await access(outputPath);
      continue;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }

  // Normalize EXIF orientation before sizing the overlay. Work from the original
  // on every regeneration, so the watermark never accumulates or degrades it.
  const { data, info } = await sharp(input).rotate().raw().toBuffer({ resolveWithObject: true });
  const fontSize = Math.min(info.width, info.height) / 18;
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}">
    <defs><pattern id="watermark" width="${fontSize * 8.5}" height="${fontSize * 4.5}"
      patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
      <text x="${fontSize * .5}" y="${fontSize * 1.5}" font-family="Arial, Helvetica, sans-serif"
        font-size="${fontSize}" font-weight="500" fill="#666666" fill-opacity=".28">933944.ru</text>
    </pattern></defs>
    <rect width="100%" height="100%" fill="url(#watermark)"/>
  </svg>`);
  await mkdir(path.dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.${process.pid}.tmp`;
  await sharp(data, { raw: info }).composite([{ input: overlay }])
    .jpeg({ quality: 95, chromaSubsampling: "4:4:4" }).toFile(temporaryPath);
  await rename(temporaryPath, outputPath);
  updated++;
}

// Remove derivatives of deleted source photos as well.
for (const file of Object.keys(previous)) {
  if (!(file in manifest)) await rm(path.join(outputDir, file), { force: true });
}
await mkdir(outputDir, { recursive: true });
const temporaryManifest = `${manifestPath}.${process.pid}.tmp`;
await writeFile(temporaryManifest, `${JSON.stringify(manifest, null, 2)}\n`);
await rename(temporaryManifest, manifestPath);
console.log(`Product watermarks: ${files.length} images ready, ${updated} updated.`);
