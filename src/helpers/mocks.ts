import type { Product } from "../types/product.ts";
import cup2Img from "../assets/images/cup2.png";
import plateImg from "../assets/images/plate3.png";
import plate2Img from "../assets/images/plate4.png";
import sugarImg from "../assets/images/sugar.jpg";
import vase0Img from "../assets/images/vase4.jpg";
import kettleImg from "../assets/images/kettle3.jpg";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "ceramic-cup",
    name: "Ceramic Cup",
    description:
      "Minimalist ceramic cup with matte finish — perfect for coffee or tea.",
    price: 45,
    currency: "USD",
    image: cup2Img,
  },
  {
    id: "2",
    slug: "handmade-plate",
    name: "Handmade Plate",
    description: "Elegant white ceramic plate with natural edges.",
    price: 25,
    currency: "USD",
    image: plateImg,
  },
  {
    id: "3",
    slug: "decorative-plate",
    name: "Decorative Plate",
    description:
      "A textured plate ideal for interior accents or serving desserts.",
    price: 35,
    currency: "USD",
    image: plate2Img,
  },
  {
    id: "4",
    slug: "sugar-bowl",
    name: "Sugar Bowl",
    description: "Compact sugar bowl with soft-glazed surface.",
    price: 15,
    currency: "USD",
    image: sugarImg,
  },
  {
    id: "5",
    slug: "modern-vase",
    name: "Modern Vase",
    description: "Matte ceramic vase with a sleek, modern design.",
    price: 25,
    currency: "USD",
    image: vase0Img,
  },
  {
    id: "6",
    slug: "vintage-kettle",
    name: "Vintage Kettle",
    description: "Classic ceramic kettle with wooden handle and vintage look.",
    price: 65,
    currency: "USD",
    image: kettleImg,
  },
];
