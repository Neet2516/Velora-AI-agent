import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SVG_FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
  <defs>
    <linearGradient id="veloraFavGrad" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#00D2FF" />
      <stop offset="35%" stop-color="#5B7CFF" />
      <stop offset="70%" stop-color="#9B51E0" />
      <stop offset="100%" stop-color="#FF4B8B" />
    </linearGradient>
  </defs>
  <path
    d="M14 16 C8 16, 4 20, 4 24 C4 28, 8 32, 14 32 C20 32, 24 26, 24 24 C24 22, 28 16, 34 16 C40 16, 44 20, 44 24 C44 28, 40 32, 34 32 C28 32, 24 26, 24 24 C24 22, 20 16, 14 16 Z"
    stroke="url(#veloraFavGrad)"
    stroke-width="5.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  />
</svg>
`;

function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerLength = 6;
  const dirEntryLength = 16;
  let offset = headerLength + dirEntryLength * count;

  const header = Buffer.alloc(headerLength);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon type 1
  header.writeUInt16LE(count, 4); // count

  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntryLength);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(item.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buffer)]);
}

async function main() {
  const root = process.cwd();
  const appDir = path.join(root, 'app');
  const publicDir = path.join(root, 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write SVGs
  fs.writeFileSync(path.join(appDir, 'icon.svg'), SVG_FAVICON, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), SVG_FAVICON, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), SVG_FAVICON, 'utf8');
  console.log('✓ Wrote icon.svg to app/ and public/');

  // 2. Generate PNGs at multiple resolutions
  const svgBuffer = Buffer.from(SVG_FAVICON);
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // 3. Create ICO containing 16, 32, 48
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Wrote multi-resolution favicon.ico to app/ and public/');

  // 4. Write Apple & PWA icons
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);
  console.log('✓ Wrote Apple touch and PWA PNG icons');

  console.log('Favicon generation complete!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
