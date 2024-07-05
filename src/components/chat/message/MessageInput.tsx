import { FaLocationArrow } from "react-icons/fa6";

function MessageInput() {
  return (
    <div className="searchBox flex max-w-full items-center justify-between bg-[#2f3640] rounded-full relative">
      <input
        className="searchInput border-none bg-transparent outline-none text-white text-[15px] py-6 px-11"
        type="text"
        name=""
        placeholder="Enter The Message"
      />
      <button className="searchButton text-white absolute right-2 w-12 h-12 rounded-full bg-gradient-to-r from-[#2AF598] to-[#009EFD] border-0 transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)] hover:bg-[#1A1A1A] hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:from-[#009EFD] hover:to-[#2AF598] active:shadow-none active:translate-y-0">
        <FaLocationArrow className="mx-auto my-auto h-5 w-5"/>
      </button>
    </div>
  );
}

export default MessageInput;
