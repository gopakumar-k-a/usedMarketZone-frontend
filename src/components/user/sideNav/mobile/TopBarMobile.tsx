import { MdOutlineMessage } from "react-icons/md";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function TopBarMobile({ handleLogout, handleThemeSwitch }: {
  handleLogout: () => void;
  handleThemeSwitch: () => void;

}) {
  const [isSettingsOpen, setSettingOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("isSettingsOpen state changed:", isSettingsOpen);
  }, [isSettingsOpen]);

  const handleSettingOpen = () => {
    setSettingOpen(!isSettingsOpen);
  };

  const handleNavigateToSettingsPage = () => {
    navigate("/settings");
    setSettingOpen(false);
  };
  return (
    <>
      <motion.nav
        className="bg-gray-800 p-4 flex justify-around h-full"
        initial={{ y: "-100vw" }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 10,
          mass: 0.5,
        }}
      >
        <div className="flex w-full justify-start">
          {isSettingsOpen ? (
            <IoSettingsOutline
              className="h-8 w-8 pr-2 text-white"
              onClick={handleSettingOpen}
            />
          ) : (
            <IoSettingsOutline
              className="h-8 w-8 pr-2 text-white"
              onClick={handleSettingOpen}
            />
          )}
        </div>

        <div className="flex w-full justify-end">
          <Link to={"/messages"}>
            <MdOutlineMessage className="h-8 w-8 pr-2 text-white cursor-pointer" />
          </Link>
        </div>
      </motion.nav>
      {isSettingsOpen && (
        <div className="w-52 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer">
          <li
            className={`flex  px-4 py-2 hover:bg-gray-300 `}
            onClick={() => handleNavigateToSettingsPage()}
          >
            settings
            <div className="flex w-full justify-end">
              <IoSettingsSharp />
              <MdOutlineArrowOutward />
            </div>
            {/* <Switch className="ml-2 mr-2  hover:text-gray-300 text-red-500" onClick={handleThemeSwitch}/> */}
          </li>
          <li className={`flex items-center px-4 py-2 hover:bg-gray-300 `}>
            Night Mode
            <LuSunMedium className="ml-2" />
            <Switch
              className="ml-2 mr-2  hover:text-gray-300 text-red-500"
              onClick={handleThemeSwitch}
            />
            <FaMoon />
          </li>
          <li
            className={`flex items-center px-4 py-2 hover:bg-gray-300 text-red-500`}
            onClick={handleLogout}
          >
            <IoLogOutSharp className="mr-2  hover:text-gray-300 text-red-500" />
            Logout
          </li>
        </div>
      )}
    </>
  );
}

export default TopBarMobile;
