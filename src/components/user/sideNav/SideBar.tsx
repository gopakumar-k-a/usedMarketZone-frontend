import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faBell,
  faEnvelope,
  faUser,
  faBars,
  faGreaterThan,
  faLessThan,
  faMagnifyingGlass,
  faHandHoldingHeart,
  faGavel,
  faMessage,
  faGear,
  faRightFromBracket,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useLocation } from "react-router-dom";
const Sidebar = ({
  isExpanded,
  toggleSidebar,
  handleLogout,
  theme,
  handleThemeSwitch,
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
              className={`p-4 mb-2 flex items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${location.pathname === "/home" ? "bg-customOrange text-white" : "bg-gray-200 dark:bg-gray-700"} text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faHome}
                className={`w-5 h-5 mr-3 ${location.pathname === "/home" ? "text-white" : "text-black"} dark:text-white`}
              />
              Home
            </Link>
            <Link
              to="/search"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${location.pathname === "/search" ? "bg-customOrange text-white" : "bg-gray-200 dark:bg-gray-700"} text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-5 h-5 mr-3 text-black dark:text-white"
              />
              Search
            </Link>
            <Link
              to="/sell"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${location.pathname === "/sell" ? "bg-customOrange text-white" : "bg-gray-200 dark:bg-gray-700"} text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faHandHoldingHeart}
                className="w-5 h-5 mr-3 text-black dark:text-white"
              />
              Sell
            </Link>
            <Link
              to="/auction"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${location.pathname === "/auction" ? "bg-customOrange text-white" : "bg-gray-200 dark:bg-gray-700"} text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faGavel}
                className="w-5 h-5 mr-3 text-black dark:text-white"
              />
              Auction
            </Link>
            <Link
              to="/messages"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${location.pathname === "/messages" ? "bg-customOrange text-white" : "bg-gray-200 dark:bg-gray-700"} text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faMessage}
                className="w-5 h-5 mr-3 text-black dark:text-white"
              />
              Messages
            </Link>
            <Link
              to="/notifications"
              className={`p-4 mb-2 flex items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${location.pathname === "/notifications" ? "bg-customOrange text-white" : "bg-gray-200 dark:bg-gray-700"} text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faBell}
                className="w-5 h-5 mr-3 text-black dark:text-white"
              />
              Notifications
            </Link>
            <Link
              to="/profile"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${location.pathname === "/profile" || location.pathname === "/edit-profile" ? "bg-customOrange text-white" : "bg-gray-200 dark:bg-gray-700"} text-gray-800 dark:text-white`}
            >
              <FontAwesomeIcon
                icon={faUser}
                className={`w-5 h-5 mr-3 ${location.pathname === "/profile" || location.pathname === "/edit-profile" ? "text-white" : "text-black"} dark:text-white`}
              />
              Profile
            </Link>
            <Link
              to="/settings"
              className={`p-4 flex mb-2 items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${location.pathname === "/settings" ? "bg-customOrange text-white" : "bg-gray-200 dark:bg-gray-700"} text-gray-800 dark:text-white`}
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
              className={`p-4 block text-gray-800 dark:text-white ${location.pathname === "/home" ? "bg-customOrange text-white rounded-xl" : ""}`}
            >
              <FontAwesomeIcon
                icon={faHome}
                className={`w-6 h-6 ${location.pathname === "/home" ? "text-white" : "text-black"} dark:text-white`}
              />
            </Link>
            <Link
              to="/search"
              className={`p-4 block text-gray-800 dark:text-white ${location.pathname === "/search" ? "bg-customOrange rounded-xl text-white" : ""}`}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={`w-6 h-6 ${location.pathname === "/search" ? "text-white" : "text-black"} dark:text-white`}
              />
            </Link>
            <Link
              to="/sell"
              className={`p-4 block text-gray-800 dark:text-white ${location.pathname === "/sell" ? "bg-customOrange rounded-xl text-white" : ""}`}
            >
              <FontAwesomeIcon
                icon={faHandHoldingHeart}
                className={`w-6 h-6 ${location.pathname === "/sell" ? "text-white" : "text-black"} dark:text-white`}
              />
            </Link>
            <Link
              to="/auction"
              className={`p-4 block text-gray-800 dark:text-white ${location.pathname === "/auction" ? "bg-customOrange rounded-xl text-white" : ""}`}
            >
              <FontAwesomeIcon
                icon={faGavel}
                className={`w-6 h-6 ${location.pathname === "/auction" ? "text-white" : "text-black"} dark:text-white`}
              />
            </Link>
            <Link
              to="/messages"
              className={`p-4 block text-gray-800 dark:text-white ${location.pathname === "/messages" ? "bg-customOrange rounded-xl text-white" : ""}`}
            >
              <FontAwesomeIcon
                icon={faMessage}
                className={`w-6 h-6 ${location.pathname === "/messages" ? "text-white" : "text-black"} dark:text-white`}
              />
            </Link>
            <Link
              to="/notifications"
              className={`p-4 block text-gray-800 dark:text-white ${location.pathname === "/notifications" ? "bg-customOrange rounded-xl text-white" : ""}`}
            >
              <FontAwesomeIcon
                icon={faBell}
                className={`w-6 h-6 ${location.pathname === "/notifications" ? "text-white" : "text-black"} dark:text-white`}
              />
            </Link>
            <Link
              to="/profile"
              className={`p-4 block text-gray-800 dark:text-white ${location.pathname === "/profile" || location.pathname === "/edit-profile"  ? "bg-customOrange rounded-xl text-white" : ""}`}
            >
              <FontAwesomeIcon
                icon={faUser}
                className={`w-6 h-6 ${location.pathname === "/profile" ? "text-white" : "text-black"} dark:text-white`}
              />
            </Link>
            <Link
              to="/settings"
              className={`p-4 block text-gray-800 dark:text-white ${location.pathname === "/settings" ? "bg-customOrange rounded-xl  text-white" : ""}`}
            >
              <FontAwesomeIcon
                icon={faGear}
                className={`w-6 h-6 ${location.pathname === "/settings" ? "text-white" : "text-black"} dark:text-white`}
              />
            </Link>
            <span
              onClick={() => handleLogout()}
              className="p-4 block text-red-600"
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="w-6 h-6 text-red-600"
              />
            </span>
          </div>
        )}
      </div>
      <div className="mb-8">
        {isExpanded && (
          <span
            onClick={() => handleLogout()}
            className="p-4 flex items-center text-red-600"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="w-5 h-5 mr-3 text-red-600"
            />
            Log Out
          </span>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
