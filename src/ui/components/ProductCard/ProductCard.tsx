type ProductCardProps = {
  name: string;
  img: string;
  price?: string;
};

export const ProductCard = ({ name, img, price }: ProductCardProps) => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col group"
    >
      <div className="relative w-full h-80 flex items-center justify-center overflow-hidden">
        <img
          src={img}
          alt={name}
          className="h-full object-contain transform group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500"></div>
      </div>

      <div className="p-4 flex justify-between items-center flex-1 gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

        <button
          className="
            opacity-0 translate-y-4
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-500
            px-4 py-2 rounded-lg font-semibold
            text-shadow-lg
            hover:text-primary hover:cursor-pointer
          "
        >
          View more
        </button>

        {price && <p className="text-accent font-medium">{price}</p>}
      </div>
    </div>
  );
};
