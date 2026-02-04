import { useTranslation } from "react-i18next";
import { useAbout } from "../../features/about/useAbout";
import { AboutSection } from "./components/AboutSection";
import { AboutSectionSkeleton } from "./components/AboutSectionSkeleton.tsx";

export const About = () => {
  const { i18n } = useTranslation();

  const { data, loading } = useAbout(i18n.language);

  if (loading || !data) {
    return (
      <div className="py-24">
        <div className="container mx-auto px-4">
          <section className="mx-auto max-w-3xl text-center">
            <div className="h-10 w-72 mx-auto bg-black/10 rounded-md animate-pulse" />
            <div className="mt-4 h-4 w-full bg-black/10 rounded-md animate-pulse" />
            <div className="mt-2 h-4 w-5/6 mx-auto bg-black/10 rounded-md animate-pulse" />
          </section>

          <div className="mt-16 space-y-20">
            <AboutSectionSkeleton />
            <AboutSectionSkeleton reverse />
            <AboutSectionSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-background-dark">
            {data.heroTitle}
          </h1>
          <p className="mt-4 text-secondary">{data.heroText}</p>
        </section>

        <div className="mt-16 space-y-20">
          {data.sections.map((section, i) => (
            <AboutSection
              key={section.id}
              section={section}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
