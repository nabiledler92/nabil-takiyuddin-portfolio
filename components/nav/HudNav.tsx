"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { LinkedInIcon, MailIcon, Monogram, SearchIcon } from "@/components/Icons";
import { ThemeSwitcher } from "@/components/nav/ThemeSwitcher";
import { OPEN_PALETTE_EVENT, sections, topNav } from "@/lib/nav";
import { goToSection } from "@/lib/scroll";
import { trackAttrs } from "@/lib/track";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

const noopSubscribe = () => () => {};
const getIsMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export function HudNav({ email, linkedin }: { email: string; linkedin: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("top");
  const isMac = useSyncExternalStore(noopSubscribe, getIsMac, () => false);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);

  // The top bar has one "Work" link that covers case studies and the project grid.
  const activeTop = active === "projects" ? "work" : active;

  // Scroll progress + active-section tracking in a single rAF-throttled listener.
  useEffect(() => {
    let raf = 0;
    const els = isHome
      ? sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el)
      : [];

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      doc.style.setProperty("--scroll", String(p));

      if (els.length) {
        const line = window.innerHeight * 0.38;
        let current = els[0].id;
        for (const el of els) {
          if (el.getBoundingClientRect().top <= line) current = el.id;
        }
        if (p > 0.995) current = els[els.length - 1].id;
        setActive(current);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isHome, pathname]);

  // Slide the active indicator under the current top-bar link.
  useIsoLayoutEffect(() => {
    const nav = navRef.current;
    const ind = indicatorRef.current;
    if (!nav || !ind) return;
    const place = () => {
      const link = isHome ? nav.querySelector<HTMLElement>(`[data-section="${activeTop}"]`) : null;
      if (!link) {
        ind.style.opacity = "0";
        return;
      }
      ind.style.opacity = "1";
      ind.style.width = `${link.offsetWidth}px`;
      ind.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place).catch(() => {});
    return () => window.removeEventListener("resize", place);
  }, [activeTop, isHome]);

  const onSectionClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      if (!isHome || e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (goToSection(id)) e.preventDefault();
    },
    [isHome],
  );

  const closeMenu = useCallback((instant = false) => {
    const d = menuRef.current;
    if (!d || !d.open) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (instant || reduced) {
      d.removeAttribute("data-closing");
      d.close();
      return;
    }
    d.setAttribute("data-closing", "");
    window.setTimeout(() => {
      d.removeAttribute("data-closing");
      d.close();
    }, 280);
  }, []);

  const openMenu = () => {
    const d = menuRef.current;
    if (d && !d.open) d.showModal();
  };

  // Close the mobile menu if the viewport grows past the breakpoint or the route changes.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && closeMenu(true);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);
  useEffect(() => closeMenu(true), [pathname, closeMenu]);

  const href = (id: string) => (id === "top" ? "/" : `/#${id}`);
  const topLinks = sections.filter((s) => topNav.includes(s.id));

  return (
    <>
      <a
        href="#main"
        className="btn btn-primary fixed top-3 left-3 z-[70] -translate-y-24 focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <header className="no-print fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div className="glass relative mx-auto flex h-14 max-w-[1180px] items-center gap-3 overflow-hidden rounded-2xl border border-line pr-2 pl-3 shadow-[0_16px_50px_-24px_var(--shadow-tint)]">
          <Link
            href="/"
            onClick={(e) => onSectionClick(e, "top")}
            className="flex shrink-0 items-center gap-2.5 rounded-lg pr-2"
            aria-label="Nabil Takiyuddin, home"
          >
            <Monogram />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.9375rem] font-semibold tracking-tight text-ink">
                Nabil Takiyuddin
              </span>
              <span className="mt-1 flex items-center gap-1.5 font-mono text-[0.5625rem] tracking-[0.2em] text-dim uppercase">
                <span className="blink size-1.5 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]" />
                Mission control
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <div ref={navRef} className="relative flex items-center">
              {topLinks.map((s) => {
                const isActive = isHome && activeTop === s.id;
                return (
                  <Link
                    key={s.id}
                    href={href(s.id)}
                    data-section={s.id}
                    onClick={(e) => onSectionClick(e, s.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`rounded-md px-3 py-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors ${
                      isActive ? "text-cyan" : "text-muted hover:text-ink"
                    }`}
                  >
                    {s.short}
                  </Link>
                );
              })}
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-px bg-cyan opacity-0 shadow-[0_0_12px_1px_var(--color-cyan)] transition-[transform,width,opacity] duration-300 ease-out"
              />
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-2">
            <span
              className="hidden items-baseline gap-1 border-l border-line pl-3 font-mono text-[0.625rem] tracking-[0.16em] text-dim uppercase xl:flex"
              aria-hidden="true"
            >
              Scroll
              <span ref={pctRef} className="text-cyan tabular-nums">
                000
              </span>
              %
            </span>
            <ThemeSwitcher compact className="hidden sm:flex" />
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command palette"
              aria-keyshortcuts="Meta+K Control+K"
              className="flex h-10 items-center gap-2 rounded-xl border border-line bg-cyan/5 px-3 text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <SearchIcon />
              <span className="hidden font-mono text-[0.6875rem] tracking-[0.12em] uppercase sm:inline">Jump to</span>
              <span className="hidden items-center gap-1 sm:flex">
                <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>
                <kbd>K</kbd>
              </span>
            </button>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-haspopup="dialog"
              className="flex size-10 flex-col items-center justify-center gap-[5px] rounded-xl border border-line bg-cyan/5 text-ink transition-colors hover:border-line-strong lg:hidden"
            >
              <span className="h-px w-4.5 bg-current" />
              <span className="h-px w-4.5 bg-cyan" />
              <span className="h-px w-4.5 bg-current" />
            </button>
          </div>

          <div
            ref={barRef}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-teal via-cyan to-violet"
          />
        </div>
      </header>

      {/* Side rail: section index for wide screens (home only) */}
      {isHome ? (
        <nav
          aria-label="Section index"
          className="no-print fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 min-[1420px]:block"
        >
          <ol className="flex flex-col gap-1">
            {sections.map((s, i) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={href(s.id)}
                    onClick={(e) => onSectionClick(e, s.id)}
                    aria-current={isActive ? "location" : undefined}
                    className="group flex h-7 items-center gap-2.5 rounded-md pr-2"
                  >
                    <span
                      className={`font-mono text-[0.625rem] tabular-nums transition-colors ${
                        isActive ? "text-cyan" : "text-dim group-hover:text-soft"
                      }`}
                    >
                      {String(i).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-px transition-all duration-300 ${
                        isActive
                          ? "w-8 bg-cyan shadow-[0_0_10px_var(--color-cyan)]"
                          : "w-3 bg-line-strong group-hover:w-5 group-hover:bg-soft"
                      }`}
                    />
                    <span
                      className={`rounded bg-void/85 px-1.5 py-0.5 font-mono text-[0.625rem] tracking-[0.14em] whitespace-nowrap uppercase transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${
                        isActive
                          ? "-translate-x-1 text-ink opacity-0 min-[1600px]:translate-x-0 min-[1600px]:opacity-100"
                          : "-translate-x-1 text-soft opacity-0"
                      }`}
                    >
                      {s.short}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}

      {/* Mobile: full-screen animated menu */}
      <dialog
        ref={menuRef}
        aria-label="Menu"
        onCancel={(e) => {
          e.preventDefault();
          closeMenu();
        }}
        className="mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-void p-0"
      >
        <div className="relative flex min-h-full flex-col px-5 pt-3 pb-8">
          <div
            aria-hidden="true"
            className="menu-glow pointer-events-none absolute inset-0"
          />
          <div
            aria-hidden="true"
            className="menu-grid pointer-events-none absolute inset-0"
          />
          <div className="relative flex h-14 items-center justify-between">
            <span className="flex items-center gap-2.5">
              <Monogram />
              <span className="label label-cyan">Navigation // 09 nodes</span>
            </span>
            <button
              type="button"
              onClick={() => closeMenu()}
              aria-label="Close menu"
              className="relative flex size-10 items-center justify-center rounded-xl border border-line-strong bg-cyan/5"
            >
              <span className="absolute h-px w-4.5 rotate-45 bg-ink" />
              <span className="absolute h-px w-4.5 -rotate-45 bg-ink" />
            </button>
          </div>

          <nav aria-label="Mobile" className="relative mt-6 flex-1">
            <ol>
              {sections.map((s, i) => {
                const isActive = isHome && active === s.id;
                return (
                  <li key={s.id} className="menu-item border-b border-line" style={{ "--i": i } as React.CSSProperties}>
                    <Link
                      href={href(s.id)}
                      onClick={(e) => {
                        closeMenu(true);
                        onSectionClick(e, s.id);
                      }}
                      aria-current={isActive ? "location" : undefined}
                      className="flex items-baseline gap-4 py-3.5"
                    >
                      <span className={`font-mono text-xs tabular-nums ${isActive ? "text-cyan" : "text-dim"}`}>
                        {String(i).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-[1.625rem] leading-tight font-medium tracking-tight ${
                          isActive ? "text-cyan" : "text-ink"
                        }`}
                      >
                        {s.label}
                      </span>
                      {isActive ? (
                        <span className="ml-auto font-mono text-[0.625rem] tracking-[0.18em] text-cyan uppercase">
                          ● here
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div
            className="menu-item relative mt-8 grid grid-cols-1 gap-2.5"
            style={{ "--i": sections.length + 1 } as React.CSSProperties}
          >
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => {
                closeMenu(true);
                openPalette();
              }}
            >
              <SearchIcon /> Search and jump
            </button>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                className="btn btn-ghost"
                href={`mailto:${email}`}
                {...trackAttrs("contact_click", { contact_type: "email", click_location: "menu" })}
              >
                <MailIcon /> Email
              </a>
              <a
                className="btn btn-ghost"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                {...trackAttrs("contact_click", { contact_type: "linkedin", click_location: "menu" })}
              >
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
            <div className="mt-4">
              <p className="label mb-2">Theme</p>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
