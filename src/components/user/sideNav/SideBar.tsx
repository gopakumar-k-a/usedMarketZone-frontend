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
import {  motion } from "framer-motion";
const menuItems = [
  {
    path: "/home",
    label: "Home",
    icon: faHome,
  },
  {
    path: "/search",
    label: "Search",
    icon: faMagnifyingGlass,
  },
  {
    path: "/post/sell-product",
    label: "Sell",
    icon: faHandHoldingHeart,
  },
  {
    path: "/post/auction-product",
    label: "Auction",
    icon: faGavel,
  },
  {
    path: "/messages",
    label: "Messages",
    icon: faMessage,
  },
  {
    path: "/notifications",
    label: "Notifications",
    icon: faBell,
    hasNotificationBadge: true,
  },
  {
    path: "/profile/my-posts",
    label: "Profile",
    icon: faUser,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: faGear,
  },
];
const Sidebar = ({
  isExpanded,
  toggleSidebar,
  handleLogout,
  theme,
  handleThemeSwitch,
  hasUnreadNotifications,
}: {
  isExpanded: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
  theme: "dark" | "light";
  handleThemeSwitch: () => void;
  hasUnreadNotifications: boolean;
}) => {
  const location = useLocation();
  const logoVariant = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };
  return (
    <div
      className={`h-screen ${isExpanded ? "w-full" : "w-full"} flex flex-col items-center border-r-2 border-gray-200 justify-between transition-all duration-300 bg-white dark:bg-gray-900`}
    >
      <div className="mt-4 ">
        <motion.div className="flex justify-center">
          <motion.img
            variants={logoVariant}
            whileHover="hover"
            src="/UMP-LOGO-final.png"
            alt="Logo"
            className="h-24 mb-4 dark:filter dark:invert"
          />
        </motion.div>

        <div className="p-4 mt-2 flex items-center ">
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
            <motion.div className="mt-2" initial={{ x: 50 }} animate={{ x: 0 }}>
              {menuItems.map(({ path, label, icon, hasNotificationBadge }) => (
                <motion.div
                  key={path}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                >
                  <Link
                    to={path}
                    className={`p-4 mb-2 flex items-center dark:font-bold dark:text-xl text-lg font-bold rounded-lg h-6 ${
                      location.pathname.includes(path)
                        ? "bg-customOrange text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    } text-gray-800 dark:text-white`}
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className={`w-5 h-5 mr-3 ${
                        location.pathname.includes(path)
                          ? "text-white"
                          : "text-black"
                      } dark:text-white`}
                    />
                    {label}
                    {hasNotificationBadge && hasUnreadNotifications && (
                      <span className="absolute right-0 top-0 w-3 h-3 bg-red-600 rounded-full"></span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {!isExpanded && (
          <motion.div className="mt-2" initial={{ x: 50 }} animate={{ x: 0 }}>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}>
              <Link
                to="/home"
                className={`p-4  flex justify-center text-gray-800 dark:text-white ${
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
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}>
              <Link
                to="/search"
                className={`p-4  flex justify-center text-gray-800 dark:text-white ${
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
            </motion.div>

            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}>
              <Link
                to="/post/sell-product"
                className={`p-4  flex justify-center text-gray-800 dark:text-white ${
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
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}>
              <Link
                to="/post/auction-product"
                className={`p-4  flex justify-center text-gray-800 dark:text-white ${
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
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}>
              <Link
                to="/messages"
                className={`p-4  flex justify-center text-gray-800 dark:text-white ${
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
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}>
              <Link
                to="/notifications"
                className={`relative p-4  flex justify-center text-gray-800 dark:text-white ${
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
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}>
              <Link
                to="/profile/my-posts"
                className={`p-4  flex justify-center text-gray-800 dark:text-white ${
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
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}>
              <Link
                to="/settings"
                className={`p-4  flex justify-center text-gray-800 dark:text-white ${
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
            </motion.div>
          </motion.div>
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
      </div>
    </div>
  );
};

export default Sidebar;
