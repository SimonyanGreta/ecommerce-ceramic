export const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-28 grid gap-10 md:grid-cols-2">
      <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
        <div className="w-full h-120 bg-black/5 animate-pulse" />
      </div>

      <div className="flex flex-col">
        <div className="h-8 w-2/3 bg-black/10 rounded-md animate-pulse" />
        <div className="mt-3 h-4 w-full bg-black/10 rounded-md animate-pulse" />
        <div className="mt-2 h-4 w-5/6 bg-black/10 rounded-md animate-pulse" />

        <div className="mt-6 h-7 w-32 bg-black/10 rounded-md animate-pulse" />

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="h-4 w-24 bg-black/10 rounded-md animate-pulse" />
          <div className="h-10 w-32 bg-black/10 rounded-xl animate-pulse" />
        </div>

        <div className="mt-6 h-12 w-full bg-black/10 rounded-xl animate-pulse" />

        <div className="mt-8 space-y-2">
          <div className="h-4 w-3/4 bg-black/10 rounded-md animate-pulse" />
          <div className="h-4 w-2/3 bg-black/10 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};
