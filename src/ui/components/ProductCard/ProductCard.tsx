type ProductCardProps = {
  name: string
  img: string
  price?: string
}

export const ProductCard = ({ name, img, price }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col">
      {/* Image with overlay */}
      <div className="relative w-full h-80 flex items-center justify-center overflow-hidden group">
        <img
          src={img}
          alt={name}
          className="h-full object-contain transform group-hover:scale-110 transition duration-500"
        />

        {/* Overlay button */}
        <button className="btn-outer absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-500">
          <span className="btn-middle">
            <span className="btn-inner">View Product</span>
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        {price && <p className="text-primary font-medium mt-1">{price}</p>}
      </div>
    </div>
  );
}

// сделать красивые карточки и создать минимальную шоп стр