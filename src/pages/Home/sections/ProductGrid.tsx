import { ProductCard } from "../../../ui/components/ProductCard";
import vase0Img from "../../../assets/images/vase4.jpg";
import plateImg from "../../../assets/images/plate3.png";
import plate2Img from "../../../assets/images/plate4.png";
import kettleImg from "../../../assets/images/kettle3.jpg";
import cup2Img from "../../../assets/images/cup2.png";
import sugarImg from "../../../assets/images/sugar.jpg";

const products = [
  { id: 1, name: "Cup", img: cup2Img, price: "$45" },
  { id: 2, name: "Plate", img: plateImg, price: "$25" },
  { id: 3, name: "Plate", img: plate2Img, price: "$35" },
  { id: 4, name: "Sugar", img: sugarImg, price: "$15" },
  { id: 5, name: "Vase", img: vase0Img, price: "$25" },
  { id: 5, name: "Kettle", img: kettleImg, price: "$65" },
];

export const ProductGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} name={product.name} img={product.img} price={product.price} />
        ))}
      </div>
    </section>
  );
};
