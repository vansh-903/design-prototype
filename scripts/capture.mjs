import { chromium } from "playwright";
import { mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import os from "node:os";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:4317";
const OUT = path.resolve(process.argv[2] ?? "captures");
const only = process.argv[3]; // optional: "shots" | "video"
const executablePath = process.env.CHROME_PATH ?? "/usr/local/bin/google-chrome";

const directions = (process.env.DIRS ?? "a,a2,a3,b").split(",").map((s) => s.trim()).filter(Boolean);
const modes = ["light", "dark"];
const viewports = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function newContext(browser, mode, opts) {
  const ctx = await browser.newContext({ ...opts, colorScheme: mode, reducedMotion: "no-preference" });
  await ctx.addInitScript((m) => localStorage.setItem("theme", m), mode);
  return ctx;
}

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = page.viewportSize().height;
  for (let y = 0; y < h; y += Math.round(vh * 0.6)) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await sleep(220);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await sleep(1200);
}

async function shots(browser) {
  for (const d of directions) {
    const dir = path.join(OUT, `direction-${d}`);
    mkdirSync(dir, { recursive: true });
    for (const mode of modes) {
      for (const [vpName, opts] of Object.entries(viewports)) {
        const ctx = await newContext(browser, mode, opts);
        const page = await ctx.newPage();
        await page.goto(`${BASE}/${d}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        await sleep(2600);
        const hero = path.join(dir, `hero-${vpName}-${mode}.png`);
        await page.screenshot({ path: hero });
        await page.evaluate(() => document.getElementById("demo")?.scrollIntoView({ block: "center", behavior: "instant" }));
        await page.waitForFunction(() => /call summary/i.test(document.body.innerText), null, { timeout: 40000 }).catch(() => {});
        await scrollThrough(page);
        const full = path.join(dir, `full-${vpName}-${mode}.png`);
        await page.screenshot({ path: full, fullPage: true });
        console.log("saved", hero, full);
        await ctx.close();
      }
    }
  }
}

async function wheel(page, total, step = 120, pause = 30) {
  const n = Math.ceil(Math.abs(total) / step);
  for (let i = 0; i < n; i++) {
    await page.mouse.wheel(0, Math.sign(total) * step);
    await sleep(pause);
  }
}

async function scrollToSelector(page, selector, offset = 80) {
  const y = await page.evaluate(
    ([s, o]) => {
      const el = document.querySelector(s);
      return el ? el.getBoundingClientRect().top - o : 0;
    },
    [selector, offset],
  );
  await wheel(page, y, 90, 28);
}

async function hoverCenter(page, selector, idx = 0) {
  const box = await page.locator(selector).nth(idx).boundingBox();
  if (!box) return;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 25 });
}

async function video(browser, d, mode) {
  const dir = path.join(OUT, `direction-${d}`);
  mkdirSync(dir, { recursive: true });
  const tmp = path.join(os.tmpdir(), "capture-video");
  mkdirSync(tmp, { recursive: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: mode,
    recordVideo: { dir: tmp, size: { width: 1440, height: 900 } },
  });
  await ctx.addInitScript((m) => localStorage.setItem("theme", m), mode);
  const page = await ctx.newPage();
  await page.mouse.move(720, 450);
  await page.goto(`${BASE}/${d}`, { waitUntil: "networkidle" });
  await sleep(3200);
  await hoverCenter(page, 'a[href="#demo"][data-cursor]');
  await sleep(900);
  await hoverCenter(page, 'main a[href="#contact"]');
  await sleep(700);
  await wheel(page, 500, 60, 30);
  await sleep(500);
  await scrollToSelector(page, "#demo", d.startsWith("a") ? 90 : 40);
  await page.mouse.move(1000, 520, { steps: 20 });
  await sleep(9000);
  await page.getByRole("tab", { name: "हिन्दी" }).first().click();
  await sleep(4500);
  await wheel(page, 1000, 90, 35);
  await sleep(400);
  for (let i = 0; i < 4; i++) {
    await hoverCenter(page, "main article", i);
    await sleep(450);
  }
  await scrollToSelector(page, "#work", 60);
  await sleep(600);
  await hoverCenter(page, "#work article", 0);
  await sleep(1200);
  await wheel(page, d.startsWith("a") ? 900 : 2600, 70, 40);
  await hoverCenter(page, "#work article", 1);
  await sleep(1000);
  await wheel(page, d.startsWith("a") ? 1400 : 2400, 80, 40);
  await sleep(500);
  await scrollToSelector(page, "#services", 60);
  await sleep(500);
  if (d.startsWith("a")) {
    for (let i = 0; i < 3; i++) {
      await hoverCenter(page, "#services article", i);
      await sleep(700);
    }
    await wheel(page, 2200, 70, 45);
  } else {
    await wheel(page, 3400, 60, 45);
    await wheel(page, 2200, 70, 45);
  }
  await sleep(1500);
  await scrollToSelector(page, "#contact", 60);
  await sleep(1500);
  await page.locator("#contact button", { hasText: "[EMAIL]" }).click();
  await sleep(1400);
  await wheel(page, 3000, 80, 35);
  await sleep(2000);
  await wheel(page, -400, 80, 40);
  await sleep(900);
  await page.getByRole("button", { name: /Switch to (light|dark) theme/ }).first().click();
  await sleep(2000);
  const v = page.video();
  await ctx.close();
  const webm = await v.path();
  const mp4 = path.join(dir, `recording-desktop-${mode}.mp4`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", webm, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "23", "-movflags", "+faststart", mp4]);
  rmSync(webm);
  console.log("saved", mp4);
}

const browser = await chromium.launch({ executablePath });
if (only !== "video") await shots(browser);
if (only !== "shots") {
  const pick = process.argv[4];
  const videoJobs = [
    ["a", "dark"],
    ["a2", "dark"],
    ["a3", "dark"],
    ["b", "light"],
  ];
  for (const [d, mode] of videoJobs) {
    if (!pick || pick === d) {
      if (!directions.includes(d) && pick !== d) continue;
      await video(browser, d, mode);
    }
  }
}
await browser.close();
rmSync(path.join(os.tmpdir(), "capture-video"), { recursive: true, force: true });
