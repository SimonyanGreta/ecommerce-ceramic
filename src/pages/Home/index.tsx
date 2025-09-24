import { HeroSection } from "./sections/HeroSection";
import { CollectionIntro } from "./sections/CollectionIntro";
import { ProductGrid } from "./sections/ProductGrid";
import { MapSection } from "./sections/MapSection";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <CollectionIntro />
      <ProductGrid />
      <MapSection />
    </div>
  );
};
