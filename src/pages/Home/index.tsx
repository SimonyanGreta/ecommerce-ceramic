import { HeroSection } from "./sections/HeroSection";
import { CollectionIntro } from "./sections/CollectionIntro";
import { ProductGrid } from "./sections/ProductGrid";
import { Info } from "../../widgets/Info";
import { LocationMap } from "../../widgets/LocationMap";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <CollectionIntro />
      <ProductGrid />
      <div className="m-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8" >
        <Info />
        <LocationMap />
      </div>
    </div>
  );
};
