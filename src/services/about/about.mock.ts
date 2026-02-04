import type { AboutResponse } from "./about.types";

import cupImg from "../../assets/images/cup0.jpg";
import processImg from "../../assets/images/mix0.jpg";
import craftImg from "../../assets/images/stand.jpg";

export const ABOUT_MOCK: Record<string, AboutResponse> = {
  en: {
    heroTitle: "About Nuard Ceramics",
    heroText:
      "We create ceramic objects that combine simple design and everyday functionality.",
    sections: [
      {
        id: "story",
        title: "How it began",
        paragraphs: [
          "Nuard Ceramics started as a small studio experiment.",
          "Our goal was to design everyday objects that feel calm and natural.",
        ],
        image: cupImg,
      },
      {
        id: "materials",
        title: "Materials and process",
        paragraphs: [
          "We use durable ceramic materials selected for texture and longevity.",
          "Each piece goes through shaping, drying and firing.",
        ],
        image: processImg,
      },
      {
        id: "craft",
        title: "Made by hand",
        paragraphs: [
          "Small batch production allows us to keep quality high.",
          "Every object keeps subtle handmade characteristics.",
        ],
        image: craftImg,
      },
    ],
  },

  ru: {
    heroTitle: "О Nuard Ceramics",
    heroText:
      "Мы создаём керамические предметы, сочетающие простой дизайн и удобство в использовании.",
    sections: [
      {
        id: "story",
        title: "Как всё началось",
        paragraphs: [
          "Nuard Ceramics начался как небольшой эксперимент.",
          "Наша цель — создавать предметы для повседневной жизни.",
        ],
        image: cupImg,
      },
      {
        id: "materials",
        title: "Материалы и процесс",
        paragraphs: [
          "Мы используем прочную керамику и уделяем внимание текстуре.",
          "Каждый предмет проходит этапы формовки и обжига.",
        ],
        image: processImg,
      },
      {
        id: "craft",
        title: "Ручная работа",
        paragraphs: [
          "Небольшие партии позволяют контролировать качество.",
          "Каждый предмет имеет уникальные детали.",
        ],
        image: craftImg,
      },
    ],
  },

  am: {
    heroTitle: "Մեր մասին",
    heroText:
      "Մենք ստեղծում ենք կերամիկական իրեր, որոնք համատեղում են պարզ դիզայնը և գործնականությունը։",
    sections: [
      {
        id: "story",
        title: "Ինչպես սկսվեց",
        paragraphs: [
          "Nuard Ceramics-ը սկսվեց որպես փոքր փորձ։",
          "Մենք ցանկանում էինք ստեղծել առօրյա օգտագործման գեղեցիկ իրեր։",
        ],
        image: cupImg,
      },
      {
        id: "materials",
        title: "Նյութեր և գործընթաց",
        paragraphs: [
          "Մենք աշխատում ենք ամուր կերամիկական նյութերով։",
          "Յուրաքանչյուր իր անցնում է ձևավորման և թրծման փուլերով։",
        ],
        image: processImg,
      },
      {
        id: "craft",
        title: "Ձեռագործ",
        paragraphs: [
          "Փոքր խմբաքանակները պահպանում են որակը։",
          "Յուրաքանչյուր իր ունի յուրահատուկ դետալներ։",
        ],
        image: craftImg,
      },
    ],
  },
};
