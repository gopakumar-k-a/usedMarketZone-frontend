import React, { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/admin/adminNavBar/AdminSideBar";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { logOut } from "@/redux/reducers/auth/authSlice";


import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
function AdminPage() {
const dispatch=useAppDispatch()
  const [theme, setTheme] = useState("light");


  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  //expand side nav
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
 
    <>    <div className="sm:grid sm:grid-cols-12 flex flex-col h-screen">
        {/* <div className="h-12  bg-violet-500 col-span-12">
          <UserNavBar />
        </div> */}
        <div className="h-16 w-full fixed top-0 bg-yellow-500 block  sm:hidden">
          {/* <SideBarMobile /> */}

        </div>
        <div
          className={`h-full  bg-red-600 hidden sm:block ${isExpanded ? "sm:col-span-2" : "sm:col-span-1"}`}
        >
          <AdminSideBar
            isExpanded={isExpanded}
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
            handleThemeSwitch={handleThemeSwitch}
            theme={theme}
          />
        </div>

        {/* Green Div: Always visible */}
        <div
          className={`h-full overflow-y-scroll  bg-white dark:bg-adminBgDark ${isExpanded ? "sm:col-span-7" : "sm:col-span-8"} pt-16 sm:pt-0`}
        >
          <Outlet />
        </div>

        {/* Blue Div: Hidden on small screens, visible on medium screens and above */}
        <div
          className={`h-full bg-blue-600 hidden sm:block ${isExpanded ? "sm:col-span-3" : "sm:col-span-3"}`}
        ></div>

        {/* Yellow Div: Visible on small screens, hidden on medium screens and above */}
        <div className="h-16 w-full  fixed bottom-0 bg-yellow-500 block sm:hidden">
          {/* <SideBarMobile /> */}
        </div>
      </div>
      </>
  );
}

export default AdminPage;
