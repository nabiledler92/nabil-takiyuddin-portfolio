"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { CopyIcon, FileIcon, HashIcon, LinkedInIcon, MailIcon, SearchIcon } from "@/components/Icons";
import { themeOptions, useThemePref } from "@/components/nav/ThemeSwitcher";
import { OPEN_PALETTE_EVENT, sections } from "@/lib/nav";
import { setThemePref, type ThemePref } from "@/lib/theme";
import { goToSection } from "@/lib/scroll";

export type PaletteCase = { slug: string; code: string; title: string; course: string };

type Action =
  | { kind: "section"; id: string }
  | { kind: "case"; slug: string }
  | { kind: "copy" }
  | { kind: "email" }
  | { kind: "linkedin" }
  | { kind: "theme"; pref: ThemePref };

type Item = {
  id: string;
  group: "Navigate" | "Case studies" | "Actions" | "Theme";
  label: string;
  hint?: string;
  keywords: string;
  icon: React.ReactNode;
  action: Action;
};

export function CommandPalette({
  cases,
  email,
  linkedin,
}: {
  cases: PaletteCase[];
  email: string;
  linkedin: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const uid = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const themePref = useThemePref();

  const close = useCallback(() => dialogRef.current?.close(), []);

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQuery("");
    setActive(0);
    setCopied(false);
    d.showModal();
    inputRef.current?.focus();
  }, []);

  const items = useMemo<Item[]>(
    () => [
      ...sections.map<Item>((s, i) => ({
        id: `sec-${s.id}`,
        group: "Navigate",
        label: s.label,
        hint: String(i).padStart(2, "0"),
        keywords: `${s.short} section go jump home`,
        icon: <HashIcon />,
        action: { kind: "section", id: s.id },
      })),
      ...cases.map<Item>((c) => ({
        id: `case-${c.slug}`,
        group: "Case studies",
        label: c.title,
        hint: c.code,
        keywords: `${c.course} case study project ${c.slug}`,
        icon: <FileIcon />,
        action: { kind: "case", slug: c.slug },
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: email,
        keywords: "mail contact clipboard",
        icon: <CopyIcon />,
        action: { kind: "copy" },
      },
      {
        id: "send-email",
        group: "Actions",
        label: "Write an email",
        hint: "mailto",
        keywords: "mail contact message",
        icon: <MailIcon />,
        action: { kind: "email" },
      },
      {
        id: "linkedin",
        group: "Actions",
        label: "Open LinkedIn profile",
        hint: "new tab",
        keywords: "social connect contact",
        icon: <LinkedInIcon />,
        action: { kind: "linkedin" },
      },
      ...themeOptions.map<Item>(({ value, label, Icon }) => ({
        id: `theme-${value}`,
        group: "Theme",
        label: value === "system" ? "Use system theme" : `Switch to ${label.toLowerCase()} theme`,
        hint: themePref === value ? "current" : undefined,
        keywords: `theme appearance mode colour color ${value === "light" ? "bright day" : value === "dark" ? "night" : "auto os device"}`,
        icon: <Icon />,
        action: { kind: "theme", pref: value },
      })),
    ],
    [cases, email, themePref],
  );

  const filtered = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return items;
    return items.filter((it) => {
      const hay = `${it.label} ${it.group} ${it.keywords} ${it.hint ?? ""}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [items, query]);

  const current = Math.min(active, Math.max(0, filtered.length - 1));

  const runItem = (item: Item | undefined) => {
    if (!item) return;
    const a = item.action;
    if (a.kind === "copy") {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          setCopied(true);
          window.setTimeout(close, 900);
        })
        .catch(() => {
          window.location.href = `mailto:${email}`;
        });
      return;
    }
    close();
    if (a.kind === "theme") {
      setThemePref(a.pref);
    } else if (a.kind === "section") {
      if (pathname === "/" && goToSection(a.id)) return;
      router.push(a.id === "top" ? "/" : `/#${a.id}`);
    } else if (a.kind === "case") {
      router.push(`/projects/${a.slug}`);
    } else if (a.kind === "email") {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(linkedin, "_blank", "noopener,noreferrer");
    }
  };

  // Global shortcuts: Cmd/Ctrl+K toggles, "/" opens when not typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const d = dialogRef.current;
      if (!d) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (d.open) d.close();
        else open();
        return;
      }
      if (e.key === "/" && !d.open && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = e.target as HTMLElement | null;
        const typing =
          t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
        if (!typing && !document.querySelector("dialog[open]")) {
          e.preventDefault();
          open();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, open);
    };
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${current}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [current, filtered.length]);

  const onInputKey = (e: React.KeyboardEvent) => {
    const n = filtered.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(n ? (current + 1) % n : 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(n ? (current - 1 + n) % n : 0);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(Math.max(0, n - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(filtered[current]);
    }
  };

  const onListClick = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-index]");
    if (el) runItem(filtered[Number(el.dataset.index)]);
  };

  const listId = `${uid}-list`;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      className="palette fixed top-[10vh] left-1/2 m-0 w-[min(40rem,calc(100vw-1.5rem))] max-w-none -translate-x-1/2 overflow-hidden rounded-2xl border border-line-strong bg-transparent p-0 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_0_60px_-20px_rgba(79,227,255,0.45)]"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="glass flex max-h-[min(34rem,76vh)] flex-col">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="shrink-0 text-cyan" width={18} height={18} />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={filtered[current] ? `${uid}-${filtered[current].id}` : undefined}
            aria-autocomplete="list"
            aria-label="Search sections, case studies and actions"
            placeholder="Jump to a section, case study or action…"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            className="h-14 w-full bg-transparent text-base text-ink placeholder:text-dim focus:outline-none"
          />
          <button
            type="button"
            onClick={close}
            className="shrink-0 rounded-md"
            aria-label="Close command palette"
          >
            <kbd>esc</kbd>
          </button>
        </div>

        <div ref={listRef} id={listId} role="listbox" aria-label="Results" onClick={onListClick} className="overflow-y-auto overscroll-contain p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">
              No matches for “{query}”. Try “contact”, “kopi” or “skills”.
            </p>
          ) : (
            filtered.map((item, index) => {
              const showGroup = index === 0 || filtered[index - 1].group !== item.group;
              const isActive = index === current;
              return (
                <div key={item.id} role="presentation">
                  {showGroup ? (
                    <div role="presentation" className="label px-3 pt-3 pb-1.5">
                      {item.group}
                    </div>
                  ) : null}
                  <div
                    id={`${uid}-${item.id}`}
                    role="option"
                    aria-selected={isActive}
                    data-index={index}
                    onPointerMove={() => setActive(index)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                      isActive ? "bg-cyan/10 text-ink shadow-[inset_2px_0_0_var(--color-cyan)]" : "text-soft"
                    }`}
                  >
                    <span className={isActive ? "text-cyan" : "text-dim"}>{item.icon}</span>
                    <span className="min-w-0 flex-1 truncate">
                      {item.id === "copy-email" && copied ? "Copied to clipboard" : item.label}
                    </span>
                    {item.hint ? (
                      <span className="hidden shrink-0 font-mono text-[0.6875rem] tracking-wider text-dim sm:inline">
                        {item.hint}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-2.5 text-[0.6875rem] text-dim">
          <span className="flex items-center gap-3 font-mono tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <kbd>↑</kbd>
              <kbd>↓</kbd> move
            </span>
            <span className="flex items-center gap-1.5">
              <kbd>↵</kbd> select
            </span>
          </span>
          <span className="hidden items-center gap-1.5 font-mono tracking-wider uppercase sm:flex">
            <kbd>/</kbd> or <kbd>⌘/Ctrl</kbd>
            <kbd>K</kbd> anywhere
          </span>
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {copied ? "Email address copied to clipboard" : `${filtered.length} results`}
        </p>
      </div>
    </dialog>
  );
}
