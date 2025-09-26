import cup2Img from "../../assets/images/cup2.png";
import plateImg from "../../assets/images/plate3.png";
import plate2Img from "../../assets/images/plate4.png";
import ashtrayImg from "../../assets/images/ashtray0.png";
import vase0Img from "../../assets/images/vase0.jpg";
import kettleImg from "../../assets/images/kettle2.png";
import { ProductCard } from "../../ui/components/ProductCard";

const products = [
  { id: 1, name: "Cup", img: cup2Img },
  { id: 2, name: "Plate", img: plateImg },
  { id: 3, name: "Plate", img: plate2Img },
  { id: 4, name: "Ashtray", img: ashtrayImg },
  { id: 5, name: "Vase", img: vase0Img },
  { id: 5, name: "Kettle", img: kettleImg },
];

export const Shop = () => {
  return (
    <div className="w-full py-16 h-screen grid grid-cols-3 grid-rows-3 gap-4 p-10">
      <h1 className="text-3xl font-bold">All Products</h1>
      <section className=" bg-white">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              img={product.img}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
