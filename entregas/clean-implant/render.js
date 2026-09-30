// Gera os PNG a partir dos HTML: node render.js
const path = require("path");
const { chromium } = require("playwright");

const pecas = [
  { html: "certificado-pfp.html", png: "certificado-pfp.png", w: 1754, h: 1240 },
  { html: "post-fibrion.html", png: "post-fibrion.png", w: 1080, h: 1350 },
];

(async () => {
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  for (const p of pecas) {
    const page = await browser.newPage({ viewport: { width: p.w, height: p.h } });
    await page.goto("file://" + path.join(__dirname, p.html));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(__dirname, p.png) });
    await page.close();
  }
  await browser.close();
})();
