import "./App.css";
import { useState, useEffect } from "react";
import { useAppDispatch } from "./utils/hooks/reduxHooks";
import { logOut } from "./redux/reducers/auth/authSlice";
import UserNavBar from "./components/user/navbar/UserNavBar";
import Sidebar from "./components/user/sideNav/SideBar";
import BottomBarMobile from "./components/user/sideNav/mobile/BottomBarMobile";
import { Outlet } from "react-router-dom";
import TopBarMobile from "./components/user/sideNav/mobile/TopBarMobile";
function App() {
  const dispatch = useAppDispatch();
  //dark mode
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

      <div className="sm:grid sm:grid-cols-12 flex flex-col h-screen">
        {/* <div className="h-12  bg-violet-500 col-span-12">
          <UserNavBar />
        </div> */}
        <div className="h-16 w-full fixed top-0 bg-yellow-500 block  sm:block md:hidden  z-50">

          <TopBarMobile           handleLogout={handleLogout}
            handleThemeSwitch={handleThemeSwitch}
            theme={theme}/>
        </div>
        <div
          className={`h-full  bg-red-600 hidden sm:block ${isExpanded ? "sm:col-span-2" : "sm:col-span-1"}`}
        >
          <Sidebar
            isExpanded={isExpanded}
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
            handleThemeSwitch={handleThemeSwitch}
            theme={theme}
          />
        </div>

        {/* Green Div: Always visible */}
        <div
          className={`h-screen overflow-y-auto  bg-white dark:bg-gray-900 ${isExpanded ? "sm:col-span-10" : "sm:col-span-11"} pt-16 sm:pt-4 `}
          style={{ paddingTop: '4rem', paddingBottom: '4rem' }} 

        >


          <Outlet />
  
    
        </div>

        {/* Blue Div: Hidden on small screens, visible on medium screens and above */}
        {/* <div
          className={`h-full bg-blue-600 hidden sm:block ${isExpanded ? "sm:col-span-3" : "sm:col-span-3"}`}
        ></div> */}

        {/* Yellow Div: Visible on small screens, hidden on medium screens and above */}
        <div className="h-16 w-full  fixed bottom-0 bg-yellow-500 block sm:hidden">
          <BottomBarMobile />
        </div>
      </div>
    </>
  );
}

export default App;
