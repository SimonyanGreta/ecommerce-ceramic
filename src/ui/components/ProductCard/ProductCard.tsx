import CartPlus from "../../../assets/icon/cart_plus.tsx";

type ProductCardProps = {
  name: string;
  img: string;
  price?: string;
};

export const ProductCard = ({
  name,
  img,
  price,
}: ProductCardProps) => {
  const onViewMore = () => {
    // open detail page for specific card
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col group">
      <div
        onClick={onViewMore}
        className="
          relative w-full h-80 flex items-center justify-center overflow-hidden
          cursor-pointer
        "
      >
        <img
          src={img}
          alt={name}
          className="h-full object-contain transform group-hover:scale-150 transition duration-500"
        />
        <div
          className="
            absolute inset-0 bg-black/0 group-hover:bg-black/20
            transition duration-500
          "
        />
        <div
          className="
            absolute bottom-4 left-1/2 -translate-x-1/2
            bg-white/90 text-gray-800 text-sm font-medium
            px-4 py-1 rounded-lg opacity-0 group-hover:opacity-100
            transition-all duration-500
          "
        >
          View more
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

        <div className="flex items-center justify-between mt-auto">
          {price && <p className="text-accent font-semibold text-lg">{price}</p>}

          <button
            className="
              flex items-center justify-center
              p-2 rounded-lg hover:bg-gray-100 transition
              active:scale-95
            "
            aria-label="Добавить в корзину"
          >
            <CartPlus />
          </button>
        </div>
      </div>
    </div>
  );
};
