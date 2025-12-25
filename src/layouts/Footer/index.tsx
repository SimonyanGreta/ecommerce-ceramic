import { Map } from "../../widgets/Map";
import { Info } from "../../widgets/Info";

export const Footer = () => {
  return (
    <footer className="bg-neutral text-center py-4">
      <Info />
      <Map />
      <p>© {new Date().getFullYear()} Nuard Ceramics</p>
    </footer>
  );
};
