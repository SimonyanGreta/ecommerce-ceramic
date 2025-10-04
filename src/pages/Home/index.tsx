import { HeroSection } from "./sections/HeroSection";
import { CollectionIntro } from "./sections/CollectionIntro";
import { ProductGrid } from "./sections/ProductGrid";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <CollectionIntro />
      <ProductGrid />
    </div>
  );
};
