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

import { AiOutlineDashboard, AiFillDashboard } from "react-icons/ai";
import { RiGroup2Line, RiGroup2Fill } from "react-icons/ri";
import { BsPostcard, BsPostcardFill } from "react-icons/bs";
import { IoHammer, IoHammerOutline } from "react-icons/io5";
import { MdReport, MdReportGmailerrorred } from "react-icons/md";

import { Link, useLocation } from "react-router-dom";
const AdminSideBar = ({
  isExpanded,
  toggleSidebar,
  handleLogout,
  theme,
  handleThemeSwitch,
}) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`h-screen ${isExpanded ? "w-full" : "w-full"} flex flex-col items-center border-r-2 border-gray-400 justify-between transition-all duration-300 bg-white dark:bg-adminBgDark`}
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
              to="/admin/dashboard"
              className={`p-4 mb-2 flex items-center text-xl font-bold rounded-lg h-6 ${currentPath === "/admin/dashboard" ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20" : "bg-white dark:bg-adminBgDark"} text-gray-800 dark:text-white`}
            >
              {currentPath === "/admin/dashboard" ? (
                <>
                  <AiFillDashboard className=" text-2xl font-bold text-adminDarkLogo mr-2" />
                  <div className="text-adminDarkLogo">Home</div>
                </>
              ) : (
                <>
                  <AiOutlineDashboard className="text-2xl font-bold mr-2" />
                  <div className="text-black dark:text-white">Home</div>
                </>
              )}
            </Link>
            <Link
              to="/admin/user-management"
              className={`p-4 mb-2 flex items-center text-xl font-bold rounded-lg h-6 ${currentPath === "/admin/user-management" ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20" : "bg-white dark:bg-adminBgDark"} text-gray-800 dark:text-white`}
            >
              {currentPath === "/admin/user-management" ? (
                <>
                  <RiGroup2Fill className=" text-2xl font-bold text-adminDarkLogo mr-2" />
                  <div className="text-adminDarkLogo">User Management</div>
                </>
              ) : (
                <>
                  <RiGroup2Line className="text-2xl font-bold mr-2" />
                  <div className="text-black dark:text-white">
                    User Management
                  </div>
                </>
              )}
            </Link>

            <Link
              to="/admin/post-management"
              className={`p-4 mb-2 flex items-center text-xl font-bold rounded-lg h-6 ${currentPath === "/admin/post-management" ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20" : "bg-white dark:bg-adminBgDark"} text-gray-800 dark:text-white`}
            >
              {currentPath === "/admin/post-management" ? (
                <>
                  <BsPostcardFill className=" text-2xl font-bold text-adminDarkLogo mr-2" />
                  <div className="text-adminDarkLogo">Post Management</div>
                </>
              ) : (
                <>
                  <BsPostcard className="text-2xl font-bold mr-2" />
                  <div className="text-black dark:text-white">
                    Post Management
                  </div>
                </>
              )}
            </Link>

            <Link
              to="/admin/bid-verfication"
              className={`p-4 mb-2 flex items-center text-xl font-bold rounded-lg h-6 ${currentPath === "/admin/bid-verfication" ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20" : "bg-white dark:bg-adminBgDark"} text-gray-800 dark:text-white`}
            >
              {currentPath === "/admin/bid-verfication" ? (
                <>
                  <IoHammer className=" text-2xl font-bold text-adminDarkLogo mr-2" />
                  <div className="text-adminDarkLogo">Bid Verfication</div>
                </>
              ) : (
                <>
                  <IoHammerOutline className="text-2xl font-bold mr-2" />
                  <div className="text-black dark:text-white">
                    Bid Verfication
                  </div>
                </>
              )}
            </Link>
            <Link
              to="/admin/post-incidents"
              className={`p-4 mb-2 flex items-center text-xl font-bold rounded-lg h-6 ${currentPath === "/admin/post-incidents" ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20" : "bg-white dark:bg-adminBgDark"} text-gray-800 dark:text-white`}
            >
              {currentPath === "/admin/post-incidents" ? (
                <>
                  <MdReport className=" text-2xl font-bold text-adminDarkLogo mr-2" />
                  <div className="text-adminDarkLogo">Post Incidents</div>
                </>
              ) : (
                <>
                  <MdReportGmailerrorred className="text-2xl font-bold mr-2" />
                  <div className="text-black dark:text-white">
                    Post Incidents
                  </div>
                </>
              )}
            </Link>
          </>
        )}

        {!isExpanded && (
          <div className="mt-2">
            <Link
              to="/admin/dashboard"
              className={`p-4 block text-gray-800 dark:text-white rounded-2xl ${currentPath === "/admin/dashboard" ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20" : "bg-white dark:bg-adminBgDark"}`}
            >
              {currentPath === "/admin/dashboard" ? (
                <>
                  <AiFillDashboard className="text-4xl font-bold text-adminDarkLogo" />
                </>
              ) : (
                <>
                  <AiOutlineDashboard className="text-4xl font-bold" />
                </>
              )}
            </Link>
            <Link
              to="/admin/user-management"
              className={`p-4 block text-gray-800 dark:text-white rounded-2xl ${currentPath === "/admin/user-management" ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20" : "bg-white dark:bg-adminBgDark"}`}
            >
              {currentPath === "/admin/user-management" ? (
                <>
                  <RiGroup2Fill className="text-4xl font-bold text-adminDarkLogo" />
                </>
              ) : (
                <>
                  <RiGroup2Line className="text-4xl font-bold" />
                </>
              )}
            </Link>
            <Link
              to="/admin/post-management"
              className={`p-4 block text-gray-800 dark:text-white rounded-2xl ${currentPath === "/admin/post-management" ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20" : "bg-white dark:bg-adminBgDark"}`}
            >
              {currentPath === "/admin/post-management" ? (
                <>
                  <BsPostcardFill className="text-4xl font-bold text-adminDarkLogo" />
                </>
              ) : (
                <>
                  <BsPostcard className="text-4xl font-bold" />
                </>
              )}
            </Link>
            <Link
              to="/admin/bid-verification"
              className={`p-4 block text-gray-800 dark:text-white rounded-2xl ${currentPath === "/admin/bid-verification" ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20" : "bg-white dark:bg-adminBgDark"}`}
            >
              {currentPath === "/admin/bid-verification" ? (
                <>
                  <IoHammer className="text-4xl font-bold text-adminDarkLogo" />
                </>
              ) : (
                <>
                  <IoHammerOutline className="text-4xl font-bold" />
                </>
              )}
            </Link>
            <Link
              to="/admin/post-incidents"
              className={`p-4 block text-gray-800 dark:text-white rounded-2xl ${currentPath === "/admin/post-incidents" ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20" : "bg-white dark:bg-adminBgDark"}`}
            >
              {currentPath === "/admin/post-incidents" ? (
                <>
                  <MdReport className="text-4xl font-bold text-adminDarkLogo" />
                </>
              ) : (
                <>
                  <MdReportGmailerrorred className="text-4xl font-bold" />
                </>
              )}
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
export default AdminSideBar;
