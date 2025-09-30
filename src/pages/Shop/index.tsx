import cup2Img from "../../assets/images/cup2.png";
import plateImg from "../../assets/images/plate3.png";
import plate2Img from "../../assets/images/plate4.png";
import sugarImg from "../../assets/images/sugar.jpg";
import vase0Img from "../../assets/images/vase0.jpg";
import kettleImg from "../../assets/images/kettle2.png";
import { ProductCard } from "../../ui/components/ProductCard";

const products = [
  { id: 1, name: "Cup", img: cup2Img, price: "$45" },
  { id: 2, name: "Plate", img: plateImg, price: "$25" },
  { id: 3, name: "Plate", img: plate2Img, price: "$35" },
  { id: 4, name: "Sugar", img: sugarImg, price: "$15" },
  { id: 5, name: "Vase", img: vase0Img, price: "$25" },
  { id: 5, name: "Kettle", img: kettleImg, price: "$65" },
];


export const Shop = () => {
  return (
    <div className="w-full py-16 px-10">
      <h1 className="text-3xl font-bold mb-12 text-center">All Products</h1>

      <section>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              img={product.img}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
