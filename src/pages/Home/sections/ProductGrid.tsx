import { ProductCard } from "../../../ui/components/ProductCard"
import vaseImg from "../../../assets/images/vase.png"
import plateImg from "../../../assets/images/plate.png"
import cupImg from "../../../assets/images/cup.jpg"

const products = [
  { id: 1, name: "Vase Terra", img: vaseImg },
  { id: 2, name: "Plate Azure", img: plateImg },
  { id: 3, name: "Cup Plum", img: cupImg },
  { id: 4, name: "Bowl Clay", img: vaseImg },
  { id: 5, name: "Jar Midnight", img: plateImg },
  { id: 6, name: "Teapot Ruby", img: cupImg },
]

export const ProductGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} name={product.name} img={product.img} />
        ))}
      </div>
    </section>
  )
}
