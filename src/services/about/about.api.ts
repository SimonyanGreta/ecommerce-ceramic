import type { AboutResponse } from "./about.types";
import { ABOUT_MOCK } from "./about.mock";

export const getAbout = async (lang: string): Promise<AboutResponse> => {
  // имитация сети
  await new Promise((r) => setTimeout(r, 200));

  return ABOUT_MOCK[lang] ?? ABOUT_MOCK.en;
  // TODO исправить после добавления бекенда
  // return fetch(`/api/about?lang=${lang}`).then((r) => r.json());
};
