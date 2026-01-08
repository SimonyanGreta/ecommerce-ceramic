import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/components/Button";

type Lang = "ru" | "en" | "am";

const LANG_KEY = "lang";

const LANGS: Array<{ code: Lang; label: string; flag: string }> = [
  { code: "ru", label: "Ru", flag: "🇷🇺" },
  { code: "en", label: "En", flag: "🇺🇸" },
  { code: "am", label: "Am", flag: "🇦🇲" },
];

export const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);

  const current: Lang = useMemo(() => {
    const lng = i18n.language || "ru";
    if (lng.startsWith("am")) return "am";
    if (lng.startsWith("en")) return "en";
    return "ru";
  }, [i18n.language]);

  const currentMeta = useMemo(
    () => LANGS.find((l) => l.code === current) ?? LANGS[0],
    [current],
  );

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  const change = async (lng: Lang) => {
    await i18n.changeLanguage(lng);
    localStorage.setItem(LANG_KEY, lng);
    setOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onClickOutside = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current) return;
      if (e.target instanceof Node && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);
    window.addEventListener("touchstart", onClickOutside);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("touchstart", onClickOutside);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        if (!canHover) return;
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (!canHover) return;
        scheduleClose();
      }}
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label="Change language"
        className="h-10 w-10 p-0 rounded-xl"
        onClick={() => {
          if (canHover) return;
          setOpen((prev) => !prev);
        }}
      >
        <span className="text-[18px] leading-none">{currentMeta.flag}</span>
      </Button>

      {open && (
        <div
          className="absolute right-0 top-full pt-2"
          onMouseEnter={() => {
            if (!canHover) return;
            clearCloseTimer();
          }}
          onMouseLeave={() => {
            if (!canHover) return;
            scheduleClose();
          }}
        >
          <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
            {LANGS.map((lang) => {
              const active = lang.code === current;

              return (
                <Button
                  key={lang.code}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => change(lang.code)}
                  className={[
                    "w-full px-4 py-2 h-auto gap-2 justify-start",
                    active
                      ? "bg-background-dark/5 text-background-dark"
                      : "bg-background-dark/5 text-secondary",
                  ].join(" ")}
                  aria-label={`Switch language to ${lang.label}`}
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
