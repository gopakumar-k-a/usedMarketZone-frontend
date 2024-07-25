import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMagnifyingGlass,
  faHandHoldingHeart,
  faGavel,
  faMessage,
  faBell,
  faUser,
  faGear,
  faRightFromBracket,
  faMoon,
  faSun,
  faGreaterThan,
  faLessThan,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({
  isExpanded,
  toggleSidebar,
  handleLogout,
  theme,
  handleThemeSwitch,
  hasUnreadNotifications,
}:{
  isExpanded:boolean,
  toggleSidebar: () => void,
  handleLogout: () => void,
  theme:'dark'|'light',
  handleThemeSwitch:()=>void,
  hasUnreadNotifications:boolean
}) => {
  const location = useLocation();

  return (
    <div
      className={`h-screen ${isExpanded ? "w-full" : "w-full"} flex flex-col items-center border-r-2 border-gray-400 justify-between transition-all duration-300 bg-white dark:bg-gray-900`}
    >
      <div className="mt-4 ">
        <img
          src="/UMZ-logo.svg"
          alt="Logo"
          className="h-12 mb-4 dark:filter dark:invert"
        />

        <div className="p-4 mt-4 flex items-center ">
          <FontAwesomeIcon
            icon={isExpanded ? faLessThan : faGreaterThan}
            className="w-5 h-5 cursor-pointer text-gray-800 dark:text-white"
            onClick={toggleSidebar}
          />

          {isExpanded && (
            <>
              <input
                type="checkbox"
                id="react-option"
                value=""
                className="hidden peer"
                required
                checked={theme === "dark"}
                onChange={handleThemeSwitch}
              />
              <label
                htmlFor="react-option"
                className="flex z-10 items-center peer relative justify-center w-14 h-14 shadow-lg duration-300 border-2 border-gray-800 hover:bg-gray-500 rounded-lg cursor-pointer text-neutral-50 hover:bg-gray-200 hover:border-gray-400"
              >
                {theme === "dark" ? (
                  <FontAwesomeIcon
                    icon={faMoon}
                    className="absolute w-5 h-5 text-white"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSun}
                    className="absolute w-5 h-5 text-yellow-400"
                  />
                )}
              </label>
            </>
          )}
        </div>
        {isExpanded && (
          <>
            <Link
              to="/home"
              className={`p-4 mb-2 flex items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${
                location.pathname.includes("/home")
                  ? "bg-customOrange text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faHome}
                className={`w-5 h-5 mr-3 ${
                  location.pathname.includes("/home")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
              Home
            </Link>
            <Link
              to="/search"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${
                location.pathname.includes("/search")
                  ? "bg-customOrange text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-5 h-5 mr-3 text-black dark:text-white"
              />
              Search
            </Link>
            <Link
              to="/post/sell-product"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${
                location.pathname.includes("/post/sell-product")
                  ? "bg-customOrange text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faHandHoldingHeart}
                className={`w-5 h-5 mr-3 ${
                  location.pathname.includes("/post/sell-product")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
              Sell
            </Link>
            <Link
              to="/post/auction-product"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${
                location.pathname.includes("/post/auction-product")
                  ? "bg-customOrange text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faGavel}
                className={`w-5 h-5 mr-3 ${
                  location.pathname.includes("/post/auction-product")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
              Auction
            </Link>
            <Link
              to="/messages"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${
                location.pathname.includes("/messages")
                  ? "bg-customOrange text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faMessage}
                className="w-5 h-5 mr-3 text-black dark:text-white"
              />
              Messages
            </Link>
            <Link
              to="/notifications"
              className={`relative p-4 mb-2 flex items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${
                location.pathname.includes("/notifications")
                  ? "bg-customOrange text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faBell}
                className="w-5 h-5 mr-3 text-black dark:text-white"
              />
              {hasUnreadNotifications && (
                <span className="absolute right-0 top-0 w-3 h-3 bg-red-600 rounded-full"></span>
              )}
              Notifications
            </Link>
            <Link
              to="/profile/my-posts"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${
                location.pathname.includes("/profile")
                  ? "bg-customOrange text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faUser}
                className={`w-5 h-5 mr-3 ${
                  location.pathname.includes("/profile")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
              Profile
            </Link>
            <Link
              to="/settings"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${
                location.pathname.includes("/settings")
                  ? "bg-customOrange text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              } text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faGear}
                className="w-5 h-5 mr-3 text-black dark:text-white"
              />
              Settings
            </Link>
          </>
        )}

        {!isExpanded && (
          <div className="mt-2">
            <Link
              to="/home"
              className={`p-4 block text-gray-800 dark:text-white ${
                location.pathname.includes("/home")
                  ? "bg-customOrange text-white rounded-xl"
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faHome}
                className={`w-6 h-6 ${
                  location.pathname.includes("/home")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
            </Link>
            <Link
              to="/search"
              className={`p-4 block text-gray-800 dark:text-white ${
                location.pathname.includes("/search")
                  ? "bg-customOrange rounded-xl text-white"
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={`w-6 h-6 ${
                  location.pathname.includes("/search")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
            </Link>
            <Link
              to="/post/sell-product"
              className={`p-4 block text-gray-800 dark:text-white ${
                location.pathname.includes("/post/sell-product")
                  ? "bg-customOrange rounded-xl text-white"
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faHandHoldingHeart}
                className={`w-6 h-6 ${
                  location.pathname.includes("/post/sell-product")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
            </Link>
            <Link
              to="/post/auction-product"
              className={`p-4 block text-gray-800 dark:text-white ${
                location.pathname.includes("/post/auction-product")
                  ? "bg-customOrange rounded-xl text-white"
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faGavel}
                className={`w-6 h-6 ${
                  location.pathname.includes("/post/auction-product")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
            </Link>
            <Link
              to="/messages"
              className={`p-4 block text-gray-800 dark:text-white ${
                location.pathname.includes("/messages")
                  ? "bg-customOrange rounded-xl text-white"
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faMessage}
                className={`w-6 h-6 ${
                  location.pathname.includes("/messages")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
            </Link>
            <Link
              to="/notifications"
              className={`relative p-4 block text-gray-800 dark:text-white ${
                location.pathname.includes("/notifications")
                  ? "bg-customOrange rounded-xl text-white"
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faBell}
                className={`w-6 h-6 ${
                  location.pathname.includes("/notifications")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
              {hasUnreadNotifications && (
                <span className="absolute right-1 top-2 w-2 h-2 bg-red-600 rounded-full"></span>
              )}
            </Link>
            <Link
              to="/profile/my-posts"
              className={`p-4 block text-gray-800 dark:text-white ${
                location.pathname.includes("/profile")
                  ? "bg-customOrange rounded-xl text-white"
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faUser}
                className={`w-6 h-6 ${
                  location.pathname.includes("/profile")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
            </Link>
            <Link
              to="/settings"
              className={`p-4 block text-gray-800 dark:text-white ${
                location.pathname.includes("/settings")
                  ? "bg-customOrange rounded-xl text-white"
                  : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faGear}
                className={`w-6 h-6 ${
                  location.pathname.includes("/settings")
                    ? "text-white"
                    : "text-black"
                } dark:text-white`}
              />
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        {isExpanded && (
          <button
            className="p-4 mb-4 flex items-center text-gray-800 dark:text-white hover:text-red-600"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
            <span className="ml-2">Logout</span>
          </button>
        )}
        {/* <Link to="/settings" className="p-4 block">
          <FontAwesomeIcon
            icon={faGear}
            className="w-6 h-6 text-gray-800 dark:text-white"
          />
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
