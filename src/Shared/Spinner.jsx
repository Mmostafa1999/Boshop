import logo from "../../public/logo.svg";

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 h-screen w-screen">
      {/* Centered Spinner and Logo */}
      <div className="relative flex bg-white rounded-full items-center justify-center h-20 w-20">
        {/* Logo */}
        <img
          src={logo}
          alt="Website Logo"
          className="absolute h-10 w-10 object-contain z-10"
        />
        {/* Spinner */}
        <div className="absolute h-full w-full border-[5px] border-t-[var(--main-color)] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
