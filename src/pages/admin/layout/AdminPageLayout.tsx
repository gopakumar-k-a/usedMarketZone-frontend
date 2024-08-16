import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../../components/admin/adminNavBar/AdminSideBar";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { logOut } from "@/redux/reducers/auth/authSlice";

import AdminTopBar from "@/components/admin/adminNavBar/AdminTopBar";
function AdminPage() {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState<"light" | "dark">("light");

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

  const [isExpanded] = useState(true);

  const handleLogout = () => {
    dispatch(logOut());
  };


  return (
    <>
      <div className="md:grid md:grid-cols-12 flex flex-col h-screen">
      
        <div className="h-16 w-full fixed top-0 bg-yellow-500 block  md:hidden">
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
            handleLogout={handleLogout}
            theme={theme}
            handleThemeSwitch={handleThemeSwitch}
          />
        </div>

        <div
          className={`h-full overflow-y-scroll  bg-white dark:bg-adminBgDark ${isExpanded ? "md:col-span-10" : "md:col-span-11"} pt-16 md:pt-0`}
        >
          <Outlet />
        </div>

 
      </div>
    </>
  );
}

export default AdminPage;
