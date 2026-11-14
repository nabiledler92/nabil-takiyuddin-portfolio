// Renders app/icon.svg into the PNG icons used by the manifest and Apple touch icon.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
(async () => {
  const root = path.join(__dirname, "..");
  const svg = fs.readFileSync(path.join(root, "app/icon.svg"), "utf8");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const shot = async (size, file, pad, square) => {
    await page.setViewportSize({ width: size, height: size });
    const s = square ? svg.replace('rx="14"', 'rx="0"') : svg;
    await page.setContent(
      `<body style="margin:0;background:${square ? "#04080f" : "transparent"};display:grid;place-items:center;width:${size}px;height:${size}px"><div style="width:${size - pad * 2}px;height:${size - pad * 2}px">${s}</div></body>`,
    );
    await page.screenshot({ path: path.join(root, file), omitBackground: !square });
  };
  await shot(192, "public/icon-192.png", 0, false);
  await shot(512, "public/icon-512.png", 0, false);
  await shot(512, "public/icon-maskable-512.png", 52, true);
  await shot(180, "app/apple-icon.png", 0, true);
  await browser.close();
})();
