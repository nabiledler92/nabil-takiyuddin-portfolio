/**
 * Colour theme: the visitor picks Dark, Light or System (follow the OS setting).
 *
 * The choice is stored in localStorage under THEME_KEY. <html> carries two attributes:
 *   data-theme-pref = "dark" | "light" | "system"   (what the visitor picked)
 *   data-theme      = "dark" | "light"              (what is actually shown; CSS keys off this)
 *
 * THEME_INIT_SCRIPT runs inline in <head> before first paint, so there is no flash of the
 * wrong theme. It also follows OS changes while the preference is "system".
 */

export type ThemePref = "dark" | "light" | "system";
export type Theme = "dark" | "light";

export const THEME_KEY = "theme";
export const THEME_EVENT = "themechange";

/** Browser UI colour (address bar on mobile) for each theme; matches --color-void. */
export const THEME_COLOR: Record<Theme, string> = { dark: "#04080f", light: "#f3f6fb" };

export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;d.dataset.js='1';var m=window.matchMedia('(prefers-color-scheme: light)');function a(){var p=d.dataset.themePref;var t=p==='light'||p==='dark'?p:(m.matches?'light':'dark');d.dataset.theme=t;var c=t==='light'?'${THEME_COLOR.light}':'${THEME_COLOR.dark}';document.querySelectorAll('meta[name="theme-color"]').forEach(function(e){e.setAttribute('content',c)})}var p;try{p=localStorage.getItem('${THEME_KEY}')}catch(e){}d.dataset.themePref=p==='light'||p==='dark'?p:'system';a();m.addEventListener('change',function(){if(d.dataset.themePref==='system'){a();window.dispatchEvent(new Event('${THEME_EVENT}'))}});document.addEventListener('DOMContentLoaded',a)})()`;

const systemTheme = (): Theme => (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

export function getThemePref(): ThemePref {
  const p = document.documentElement.dataset.themePref;
  return p === "light" || p === "dark" ? p : "system";
}

export function setThemePref(pref: ThemePref) {
  const d = document.documentElement;
  try {
    if (pref === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, pref);
  } catch {
    // Private mode or blocked storage: the choice still applies for this page view.
  }
  const theme = pref === "system" ? systemTheme() : pref;

  // Switch every colour at once instead of letting each element run its own transition.
  d.setAttribute("data-theme-switching", "");
  d.dataset.themePref = pref;
  d.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLOR[theme]));
  requestAnimationFrame(() => requestAnimationFrame(() => d.removeAttribute("data-theme-switching")));

  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeTheme(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}
