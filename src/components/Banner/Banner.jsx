import MainButton from "../../Shared/MainButton";

const Banner = () => {
  return (
    <header className="h-screen bg-[#f1eff4] bg-center  md:bg-right-top bg-no-repeat bg-fixed bg-[url('src/assets/slide-bg-1.png')]">
      <div className="h-full flex flex-col justify-center items-start px-6 sm:px-12 md:px-16">
        {/* Text Section */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <p className="text-black text-3xl sm:text-4xl md:text-5xl font-extrabold">
            $299.99
          </p>
          <h2 className="text-gray-700 text-lg sm:text-xl md:text-2xl">
            The Latest Winter Products for 2025
          </h2>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-800">
            look hot with 2025 style
          </h1>
          <MainButton targetLink="/products" btnContent="Shop Now" />
        </div>
      </div>
    </header>
  );
};

export default Banner;
