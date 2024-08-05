import { GoHomeFill, GoHome } from "react-icons/go";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FaHandHolding } from "react-icons/fa";
import { ImHammer2 } from "react-icons/im";

import { RiNotification2Fill, RiNotification2Line } from "react-icons/ri";
import { FaRegUser, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const BottomBarMobile = ({
  hasUnreadNotifications,
}: {
  hasUnreadNotifications: boolean;
}) => {
  const location = useLocation();
  const currentPath: string = location.pathname;
  const [isListVisible, setIsListVisible] = useState(false);

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-around h-full">
        <Link to={"/home"} className="text-white">
          {currentPath == "/home" ? (
            <GoHomeFill className="w-5 h-5" />
          ) : (
            <GoHome className="w-5 h-5" />
          )}
        </Link>
        <Link to={"/search"} className="text-white">
          {currentPath == "/search" ? (
            <RiSearchFill className="w-5 h-5" />
          ) : (
            <RiSearchLine className="w-5 h-5" />
          )}
        </Link>

        <div className="text-white relative  flex justify-center">
          {/* <div className="relative inline-block"> */}
          {isListVisible && (
            <ul className="absolute bottom-full mb-2 bg-white border border-gray-300 rounded shadow-lg w-48">
              <Link to={"/post/sell-product"} onClick={toggleListVisibility}>
                <li
                  className={`flex items-center px-4 py-2 hover:bg-gray-300 ${currentPath == "/post/sell-product" ? "bg-gray-200" : ""}  text-black`}
                >
                  <FaHandHolding className="mr-2" /> sell product
                </li>
              </Link>
              <Link to={"/post/auction-product"} onClick={toggleListVisibility}>
                <li
                  className={`flex items-center px-4 py-2 hover:bg-gray-300 ${currentPath == "/post/auction-product" ? "bg-gray-200" : ""}  text-black`}
                >
                  <ImHammer2 /> auction product
                </li>
              </Link>
            </ul>
          )}

          {currentPath == "/post/sell-product" ||
          currentPath == "/post/auction-product" ? (
            <AiFillPlusCircle
              className="w-5 h-5"
              onClick={toggleListVisibility}
            />
          ) : (
            <AiOutlinePlusCircle
              className="w-5 h-5"
              onClick={toggleListVisibility}
            />
          )}
        </div>

        <Link to={"/notifications"} className="text-white">
        {hasUnreadNotifications && (
            <span className=" top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
          )}
          {currentPath == "/notifications" ? (
            <RiNotification2Fill className="w-5 h-5" />
          ) : (
            <RiNotification2Line className="w-5 h-5" />
          )}
       
        </Link>
        <Link to={"/profile/my-posts"} className="text-white">
          {currentPath == "/profile" ? (
            <FaUser className="w-5 h-5" />
          ) : (
            <FaRegUser className="w-5 h-5" />
          )}
       
        </Link>
      </nav>
    </>
  );
};

export default BottomBarMobile;
