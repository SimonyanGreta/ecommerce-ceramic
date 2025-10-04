import { Map } from "../Map";

export const Footer = () => {
  return (
    <footer className="bg-neutral text-center py-4">
      <Map/>
      <p>© {new Date().getFullYear()} Nuard Ceramics</p>
    </footer>
  );
};
