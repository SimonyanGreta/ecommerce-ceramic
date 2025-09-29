import vaseImg from "../../../assets/images/vase.png";
import kettleImg from "../../../assets/images/kettle0.png";
import kettle2Img from "../../../assets/images/kettle2.png";
import toyImg from "../../../assets/images/toy.jpg";
import ashtrayImg from "../../../assets/images/ashtray2.png";
import saryanImg from "../../../assets/images/saryan.webp";

export const HeroSection = () => {
  return (
    <section className="w-full h-screen grid grid-cols-3 grid-rows-3 gap-4 p-10">
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <img src={vaseImg} alt="Vase" className="w-full h-full object-cover" />
      </div>
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={kettleImg}
          alt="kettle"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="row-span-1 col-span-1 bg-gray-200 rounded-lg overflow-hidden">
        <img src="/logo/logo2.png" alt="logo" className="w-full h-full object-cover" />
      </div>

      <div className="row-span-2 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={saryanImg}
          alt="saryan"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center text-center bg-white/60 backdrop-blur-md rounded-lg">
        <div>
          <h1 className="text-5xl font-bold ">Nuard Ceramics</h1>
          <p className="mt-2 text-lg text-shadow-lg/30">
            Timeless handmade pottery
          </p>
        </div>
      </div>

      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={ashtrayImg}
          alt="ashtray"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="col-span-1 bg-gray-200 rounded-lg overflow-hidden">
        <img src={toyImg} alt="toy" className="w-full h-full object-cover" />
      </div>
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={kettle2Img}
          alt="kettle2"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

// export const HeroSection = () => {
//   return (
//     <section className="w-full h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-4 p-6">
//       {/* cube */}
//       <div className="bg-gray-200 rounded-lg overflow-hidden">
//         <img src={vaseImg} alt="Vase" className="w-full h-full object-cover" />
//       </div>
//
//       {/* cube */}
//       <div className="bg-gray-200 rounded-lg overflow-hidden">
//         <img src={kettleImg} alt="Kettle" className="w-full h-full object-cover" />
//       </div>
//
//       {/* horizontal rectangle */}
//       <div className="bg-gray-200 rounded-lg overflow-hidden lg:col-span-1 lg:row-span-1">
//         <img src={logo} alt="logo" className="w-full h-full object-cover" />
//       </div>
//
//       {/* vertical rectangle */}
//       <div className="bg-gray-200 rounded-lg overflow-hidden lg:row-span-2">
//         <img src={saryanImg} alt="Saryan" className="w-full h-full object-cover" />
//       </div>
//
//       {/* center text block */}
//       <div className="flex items-center justify-center text-center bg-white/60 backdrop-blur-md rounded-lg">
//         <div>
//           <h1 className="text-4xl lg:text-5xl font-bold">Nuard Ceramics</h1>
//           <p className="mt-2 text-lg">Timeless handmade pottery</p>
//         </div>
//       </div>
//
//       {/* cube */}
//       <div className="bg-gray-200 rounded-lg overflow-hidden">
//         <img src={ashtrayImg} alt="Ashtray" className="w-full h-full object-cover" />
//       </div>
//
//       {/* horizontal rectangle */}
//       <div className="bg-gray-200 rounded-lg overflow-hidden lg:col-span-1">
//         <img src={toyImg} alt="Toy" className="w-full h-full object-cover" />
//       </div>
//
//       {/* cube */}
//       <div className="bg-gray-200 rounded-lg overflow-hidden">
//         <img src={kettle2Img} alt="Kettle2" className="w-full h-full object-cover" />
//       </div>
//     </section>
//   )
// }
