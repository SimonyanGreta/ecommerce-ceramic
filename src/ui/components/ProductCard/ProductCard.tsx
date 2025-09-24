type ProductCardProps = {
  name: string;
  img: string;
};

export const ProductCard = ({ name, img }: ProductCardProps) => {
  return (
    <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      <img src={img} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
    </div>
  );
};
