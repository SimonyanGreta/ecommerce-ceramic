export type AboutSection = {
  id: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt?: string;
};

export type AboutResponse = {
  heroTitle: string;
  heroText: string;
  sections: AboutSection[];
};
