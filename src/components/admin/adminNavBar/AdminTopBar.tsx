import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faMoon,
  faSun,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiFillDashboard } from "react-icons/ai";
import { RiGroup2Line, RiGroup2Fill } from "react-icons/ri";
import { BsPostcard, BsPostcardFill } from "react-icons/bs";
import { IoHammer, IoHammerOutline } from "react-icons/io5";
import {
  MdReport,
  MdReportGmailerrorred,
  MdLockPerson,
  MdOutlineLockPerson,
} from "react-icons/md";
import { PiPackageBold, PiPackageFill } from "react-icons/pi";

const AdminTopBar = ({
  handleLogout,
  theme,
  handleThemeSwitch,
}: {
  handleLogout: () => void;
  theme: "dark" | "light";
  handleThemeSwitch: () => void;
}) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed w-full top-0 z-50 flex items-center justify-between p-4 bg-white dark:bg-adminBgDark shadow-md">
      <div className="flex items-center">
        <button onClick={toggleMenu} className="text-2xl">
          <FontAwesomeIcon icon={faBars} />
        </button>
        {menuOpen && (
          <div
            className="flex flex-col items-start absolute top-16 left-0 bg-white dark:bg-adminBgDark shadow-lg p-4"
            onClick={() => toggleMenu()}
          >
            <Link
              to="/admin/dashboard"
              className={`p-2 flex items-center text-xl font-bold rounded-lg h-6 ${
                currentPath === "/admin/dashboard"
                  ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20"
                  : "bg-white dark:bg-adminBgDark"
              } text-gray-800 dark:text-white`}
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
              className={`p-2 flex items-center text-xl font-bold rounded-lg h-6 ${
                currentPath === "/admin/user-management"
                  ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20"
                  : "bg-white dark:bg-adminBgDark"
              } text-gray-800 dark:text-white`}
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
              className={`p-2 flex items-center text-xl font-bold rounded-lg h-6 ${
                currentPath === "/admin/post-management"
                  ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20"
                  : "bg-white dark:bg-adminBgDark"
              } text-gray-800 dark:text-white`}
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
              to="/admin/bid-verification"
              className={`p-2 flex items-center text-xl font-bold rounded-lg h-6 ${
                currentPath === "/admin/bid-verification"
                  ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20"
                  : "bg-white dark:bg-adminBgDark"
              } text-gray-800 dark:text-white`}
            >
              {currentPath === "/admin/bid-verification" ? (
                <>
                  <IoHammer className=" text-2xl font-bold text-adminDarkLogo mr-2" />
                  <div className="text-adminDarkLogo">Bid Verification</div>
                </>
              ) : (
                <>
                  <IoHammerOutline className="text-2xl font-bold mr-2" />
                  <div className="text-black dark:text-white">
                    Bid Verification
                  </div>
                </>
              )}
            </Link>
            <Link
              to="/admin/post-incidents"
              className={`p-2 flex items-center text-xl font-bold rounded-lg h-6 ${
                currentPath === "/admin/post-incidents"
                  ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20"
                  : "bg-white dark:bg-adminBgDark"
              } text-gray-800 dark:text-white`}
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
            <Link
              to="/admin/kyc-requests"
              className={`p-2 flex items-center text-xl font-bold rounded-lg h-6 ${
                currentPath === "/admin/kyc-requests"
                  ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20"
                  : "bg-white dark:bg-adminBgDark"
              } text-gray-800 dark:text-white`}
            >
              {currentPath === "/admin/kyc-requests" ? (
                <>
                  <MdLockPerson className=" text-2xl font-bold text-adminDarkLogo mr-2" />
                  <div className="text-adminDarkLogo">KYC Requests</div>
                </>
              ) : (
                <>
                  <MdOutlineLockPerson className="text-2xl font-bold mr-2" />
                  <div className="text-black dark:text-white">KYC Requests</div>
                </>
              )}
            </Link>
            <Link
              to="/admin/bid-transaction"
              className={`p-2 flex items-center text-xl font-bold rounded-lg h-6 ${
                currentPath === "/admin/bid-transaction"
                  ? "dark:bg-adminDarkLogo dark:bg-opacity-10 dark:text-white bg-gray-700 bg-opacity-20"
                  : "bg-white dark:bg-adminBgDark"
              } text-gray-800 dark:text-white`}
            >
              {currentPath === "/admin/bid-transaction" ? (
                <>
                  <PiPackageFill className=" text-2xl font-bold text-adminDarkLogo mr-2" />
                  <div className="text-adminDarkLogo">Bid Transactions</div>
                </>
              ) : (
                <>
                  <PiPackageBold className="text-2xl font-bold mr-2" />
                  <div className="text-black dark:text-white">
                    Bid Transactions
                  </div>
                </>
              )}
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <Link to={"/admin/dashboard"}>
            <img
              src="/UMZ-logo.svg"
              alt="Logo"
              className="h-8"
              onClick={() => setMenuOpen(false)}
            />
          </Link>
        </div>
        <input
          type="checkbox"
          id="react-option"
          value=""
          className="hidden peer"
          checked={theme === "dark"}
          onChange={handleThemeSwitch}
        />
        <label
          htmlFor="react-option"
          className="cursor-pointer peer-checked:before:translate-x-7 before:content-[''] before:block before:bg-slate-300 before:dark:bg-slate-700 before:border before:border-gray-400 before:dark:border-slate-600 before:rounded-full before:w-5 before:h-5 before:absolute before:top-0.5 before:left-0.5 before:transition-all relative w-14 h-7 bg-gray-200 dark:bg-slate-800 rounded-full block"
        >
          <span className="sr-only">Enable dark mode</span>
          {theme === "dark" ? (
            <FontAwesomeIcon
              icon={faMoon}
              className="absolute right-1 top-1.5"
            />
          ) : (
            <FontAwesomeIcon
              icon={faSun}
              className="absolute right-1 top-1.5"
            />
          )}
        </label>
        <button
          onClick={handleLogout}
          className="ml-4 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default AdminTopBar;
