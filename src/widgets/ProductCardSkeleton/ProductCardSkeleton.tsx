export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col">
      <div className="relative w-full h-80 bg-black/5 animate-pulse" />

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="h-5 w-3/4 bg-black/10 rounded-md animate-pulse" />
        <div className="mt-4 flex items-center justify-between">
          <div className="h-5 w-24 bg-black/10 rounded-md animate-pulse" />
          <div className="h-9 w-9 bg-black/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};