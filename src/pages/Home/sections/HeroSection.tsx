import vaseImg from "../../../assets/images/vase.png";

export const HeroSection = () => {
  return (
    <section className="w-full h-screen bg-gray-200 flex items-center justify-center relative">
      <img
        src={vaseImg}
        alt="Ceramic product"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 text-white text-center">
        <h1 className="text-4xl sm:text-6xl font-bold drop-shadow-md">
          Nuard Ceramics
        </h1>
        <p className="mt-4 text-lg sm:text-2xl">Timeless handmade pottery</p>
      </div>
      <div className="absolute inset-0 bg-black/40" />
    </section>
  );
};
