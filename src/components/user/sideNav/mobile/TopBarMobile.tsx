import { MdOutlineMessage } from "react-icons/md";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
// import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function TopBarMobile({ handleLogout, handleThemeSwitch, theme }) {
  const [isSettingsOpen, setSettingOpen] = useState(false);
  useEffect(() => {
    console.log("isSettingsOpen state changed:", isSettingsOpen);
  }, [isSettingsOpen]);

  const handleSettingOpen = () => {
    setSettingOpen(!isSettingsOpen);
  };

  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-around h-full">
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
          <MdOutlineMessage className="h-8 w-8 pr-2 text-white" />
        </div>
      </nav>
      {isSettingsOpen && (
        <div
          className="w-52 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <li className={`flex items-center px-4 py-2 hover:bg-gray-300 `}>
            Night Mode
            <LuSunMedium className="ml-2"/>
            <Switch className="ml-2 mr-2  hover:text-gray-300 text-red-500" onClick={handleThemeSwitch}/>
            <FaMoon/>
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
