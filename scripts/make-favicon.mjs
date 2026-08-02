import sharp from "sharp";
import path from "path";

const src = path.join("public", "toolwright.png");
const img = sharp(src);
const { width, height } = await img.metadata();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

let minX = width,
  minY = height,
  maxX = 0,
  maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * info.channels;
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const a = info.channels === 4 ? data[i + 3] : 255;
    if (a < 20) continue;
    if (r > 245 && g > 245 && b > 245) continue;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}

const contentW = maxX - minX + 1;
const probeY = minY + Math.floor((maxY - minY) * 0.15);
let left = width,
  right = 0;
for (let x = 0; x < width; x++) {
  const i = (probeY * width + x) * info.channels;
  const r = data[i],
    g = data[i + 1],
    b = data[i + 2];
  if (r > 245 && g > 245 && b > 245) continue;
  if (x < left) left = x;
  if (x > right) right = x;
}
const side = right - left + 1;

let iconBottom = minY + side;
let whiteRun = 0;
for (let y = minY; y < minY + side + 40 && y < height; y++) {
  let nonWhite = 0;
  for (let x = left; x <= right; x++) {
    const i = (y * width + x) * info.channels;
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    if (!(r > 245 && g > 245 && b > 245)) nonWhite++;
  }
  if (nonWhite < side * 0.05) {
    whiteRun++;
    if (whiteRun >= 6) {
      iconBottom = y - whiteRun;
      break;
    }
  } else whiteRun = 0;
}

const iconSide = Math.max(side, iconBottom - minY + 1);
const cx = Math.floor((left + right) / 2);
const cy = Math.floor((minY + iconBottom) / 2);
const pad = Math.ceil(iconSide * 0.02);
let extractSize = iconSide + pad * 2;
let leftCrop = Math.max(0, Math.floor(cx - extractSize / 2));
let topCrop = Math.max(0, Math.floor(cy - extractSize / 2));
if (leftCrop + extractSize > width) leftCrop = width - extractSize;
if (topCrop + extractSize > height) topCrop = height - extractSize;
extractSize = Math.min(extractSize, width - leftCrop, height - topCrop);

console.log({
  contentW,
  left,
  right,
  side,
  iconBottom,
  leftCrop,
  topCrop,
  extractSize,
});

const base = await sharp(src)
  .extract({
    left: leftCrop,
    top: topCrop,
    width: extractSize,
    height: extractSize,
  })
  .ensureAlpha()
  .png()
  .toBuffer();

await sharp(base)
  .resize(512, 512)
  .ensureAlpha()
  .png()
  .toFile("public/toolwright-icon.png");
await sharp(base)
  .resize(32, 32)
  .ensureAlpha()
  .png()
  .toFile("src/app/icon.png");
await sharp(base)
  .resize(180, 180)
  .ensureAlpha()
  .png()
  .toFile("src/app/apple-icon.png");

console.log("Favicons written (icon.png, apple-icon.png, toolwright-icon.png).");
