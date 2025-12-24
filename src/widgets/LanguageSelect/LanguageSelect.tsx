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

  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={() => scheduleClose()}
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label="Change language"
        className="h-10 w-10 p-0 rounded-xl"
      >
        <span className="text-[18px] leading-none">{currentMeta.flag}</span>
      </Button>

      {open && (
        <div
          className="absolute right-0 top-full pt-2"
          onMouseEnter={() => clearCloseTimer()}
          onMouseLeave={() => scheduleClose()}
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
                    "w-full px-4 py-2 h-auto gap-2 ",
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
