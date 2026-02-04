import { motion } from "framer-motion";
import type { AboutSection as AboutSectionType } from "../../../services/about/about.types";

type Props = {
  section: AboutSectionType;
  reverse?: boolean;
};

export const AboutSection = ({ section, reverse = false }: Props) => {
  return (
    <motion.section
      className="grid gap-10 items-center md:grid-cols-2"
      initial={{
        opacity: 0,
        x: reverse ? 32 : -32,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className={reverse ? "md:order-2" : ""}>
        <h2 className="text-2xl font-semibold text-background-dark">
          {section.title}
        </h2>

        <div className="mt-4 space-y-4 text-secondary leading-7">
          {section.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>

      <div className={reverse ? "md:order-1" : ""}>
        <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
          <img
            src={section.image}
            alt={section.imageAlt ?? section.title}
            className="w-full h-72 md:h-80 object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </motion.section>
  );
};
