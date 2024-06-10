import React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { logOut } from "../../redux/reducers/user/auth/authSlice";
function UserNavBar() {
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
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-12 flex justify-end space-x-2 mr-2">
        <button
          className="bg-red-700 px-5 py-3 hover:bg-red-400 rounded"
          onClick={() => dispatch(logOut())}
        >
          logOut
        </button>
        <button
          onClick={handleThemeSwitch}
          className="bg-blue-500 px-3 py-2 hover:bg-blue-400 rounded"
        >
          dark mode
        </button>
      </div>
    </div>
  );
}

export default UserNavBar;
