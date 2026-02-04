type Props = {
  reverse?: boolean;
};

export const AboutSectionSkeleton = ({ reverse = false }: Props) => {
  return (
    <section className="grid gap-10 items-center md:grid-cols-2">
      <div className={reverse ? "md:order-2" : ""}>
        <div className="h-8 w-1/2 bg-black/10 rounded-md animate-pulse" />

        <div className="mt-4 space-y-3">
          <div className="h-4 w-full bg-black/10 rounded-md animate-pulse" />
          <div className="h-4 w-11/12 bg-black/10 rounded-md animate-pulse" />
          <div className="h-4 w-4/5 bg-black/10 rounded-md animate-pulse" />
        </div>
      </div>

      <div className={reverse ? "md:order-1" : ""}>
        <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
          <div className="w-full h-72 md:h-80 bg-black/5 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
