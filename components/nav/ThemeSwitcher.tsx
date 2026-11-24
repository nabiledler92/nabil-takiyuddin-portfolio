"use client";

import { useSyncExternalStore } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/Icons";
import { getThemePref, setThemePref, subscribeTheme, type ThemePref } from "@/lib/theme";
import { track } from "@/lib/track";

export const themeOptions: { value: ThemePref; label: string; Icon: typeof SunIcon }[] = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
];

export function useThemePref(): ThemePref {
  return useSyncExternalStore(subscribeTheme, getThemePref, () => "system");
}

/**
 * Three-way Light / Dark / System switch. `compact` shows icons only (header);
 * otherwise each option has a text label (mobile menu).
 */
export function ThemeSwitcher({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const pref = useThemePref();

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={`flex items-center gap-0.5 rounded-xl border border-line bg-cyan/5 ${compact ? "p-[3px]" : "p-1"} ${className}`}
    >
      {themeOptions.map(({ value, label, Icon }) => {
        const on = pref === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={on}
            aria-label={compact ? `${label} theme` : undefined}
            title={compact ? `${label} theme` : undefined}
            onClick={() => {
              setThemePref(value);
              track("theme_change", { theme: value });
            }}
            className={`flex items-center justify-center gap-2 rounded-lg transition-colors ${
              compact ? "size-8" : "h-10 flex-1 font-mono text-[0.6875rem] tracking-[0.12em] uppercase"
            } ${on ? "bg-cyan/15 text-cyan shadow-[inset_0_0_0_1px_var(--color-line-strong)]" : "text-muted hover:text-ink"}`}
          >
            <Icon />
            {compact ? null : label}
          </button>
        );
      })}
    </div>
  );
}
