import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../../components/admin/adminNavBar/AdminSideBar";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { logOut } from "@/redux/reducers/auth/authSlice";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AdminTopBar from "@/components/admin/adminNavBar/AdminTopBar";
function AdminPage() {
  const dispatch = useAppDispatch();
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
    <>
      {" "}
      <div className="md:grid md:grid-cols-12 flex flex-col h-screen">
        {/* <div className="h-12  bg-violet-500 col-span-12">
          <UserNavBar />
        </div> */}
        <div className="h-16 w-full fixed top-0 bg-yellow-500 block  md:hidden">
          {/* <SideBarMobile /> */}
          <AdminTopBar
            handleLogout={handleLogout}
            handleThemeSwitch={handleThemeSwitch}
            theme={theme}
          />
        </div>
        <div
          className={`h-full  bg-red-600 hidden md:block ${isExpanded ? "md:col-span-2" : "md:col-span-1"}`}
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
          className={`h-full overflow-y-scroll  bg-white dark:bg-adminBgDark ${isExpanded ? "md:col-span-10" : "md:col-span-11"} pt-16 md:pt-0`}
        >
          <Outlet />
        </div>

        {/* Yellow Div: Visible on small screens, hidden on medium screens and above */}
        {/* <div className="h-16 w-full  fixed bottom-0 bg-yellow-500 block md:hidden">
         
        </div> */}
      </div>
    </>
  );
}

export default AdminPage;
