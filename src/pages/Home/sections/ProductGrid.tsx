import { ProductCard } from "../../../ui/components/ProductCard";
import vase0Img from "../../../assets/images/vase0.jpg";
import plateImg from "../../../assets/images/plate3.png";
import plate2Img from "../../../assets/images/plate4.png";
import kettleImg from "../../../assets/images/kettle2.png";
import cup2Img from "../../../assets/images/cup2.png";
import ashtrayImg from "../../../assets/images/ashtray0.png";

const products = [
  { id: 1, name: "Cup", img: cup2Img },
  { id: 2, name: "Plate", img: plateImg },
  { id: 3, name: "Plate", img: plate2Img },
  { id: 4, name: "Ashtray", img: ashtrayImg },
  { id: 5, name: "Vase", img: vase0Img },
  { id: 5, name: "Kettle", img: kettleImg },
];

export const ProductGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} name={product.name} img={product.img} />
        ))}
      </div>
    </section>
  );
};
