// Takes desktop (1440) and mobile (390) screenshots against a running `next start`.
// Usage: BASE_URL=http://localhost:3000 node scripts/screenshots.cjs
const { chromium } = require("playwright");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = path.join(__dirname, "..", "screenshots");
const CASE = "/projects/kopi-sentiment-idss";

async function settle(page) {
  // Scroll through the page so scroll-reveal content and counters finish animating.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
}

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  for (const vp of [
    { name: "desktop", width: 1440, height: 900, scale: 1 },
    { name: "mobile", width: 390, height: 844, scale: 2 },
  ]) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.scale,
      isMobile: vp.name === "mobile",
      hasTouch: vp.name === "mobile",
    });
    await ctx.addInitScript(() => {
      // instant scrolling keeps the capture deterministic
      const s = document.createElement("style");
      s.textContent = "html{scroll-behavior:auto!important}";
      document.addEventListener("DOMContentLoaded", () => document.head.appendChild(s));
    });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && errors.push(`${vp.name}: ${m.text()}`));
    page.on("pageerror", (e) => errors.push(`${vp.name}: ${e.message}`));

    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2600);
    await page.screenshot({ path: path.join(OUT, `home-${vp.name}-hero.png`) });
    await settle(page);
    await page.screenshot({ path: path.join(OUT, `home-${vp.name}.png`), fullPage: true });

    // Navigation states
    if (vp.name === "desktop") {
      await page.evaluate(() => document.getElementById("experience").scrollIntoView());
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(OUT, "home-desktop-nav-active.png") });
      await page.keyboard.press("Control+k");
      await page.waitForTimeout(400);
      await page.keyboard.type("kopi");
      await page.waitForTimeout(200);
      await page.screenshot({ path: path.join(OUT, "command-palette-desktop.png") });
      await page.keyboard.press("Escape");
    } else {
      await page.click('button[aria-label="Open menu"]');
      await page.waitForTimeout(1200);
      await page.screenshot({ path: path.join(OUT, "mobile-menu.png") });
      await page.click('button[aria-label="Close menu"]');
      await page.waitForTimeout(500);
    }

    await page.goto(BASE + CASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    await settle(page);
    await page.screenshot({ path: path.join(OUT, `case-study-${vp.name}.png`), fullPage: true });
    await ctx.close();
  }
  await browser.close();
  if (errors.length) console.log("Console errors:\n" + errors.join("\n"));
  else console.log("No console errors.");
})();
