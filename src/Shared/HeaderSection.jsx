// eslint-disable-next-line react/prop-types
export default function HeaderSection({ title }) {
  return (
    <div className="flex justify-center items-center  py-8">
      <div className="text-center">
        <h2 className="relative inline-block font-bold text-4xl font-serif md:text-5xl">
          {title}
          <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-[70px] h-[5px] bg-[#f7444e]"></span>
        </h2>
      </div>
    </div>
  );
}
