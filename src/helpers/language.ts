export const normalizeLanguage = (lang?: string): "ru" | "en" | "am" => {
  const base = (lang ?? "en").toLowerCase().split("-")[0];

  if (base === "ru" || base === "en" || base === "am") {
    return base;
  }

  return "en";
};
