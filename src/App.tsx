import "./App.css";
import { useAppDispatch } from "./utils/hooks/reduxHooks";
import { logOut } from "./redux/reducers/user/auth/userSlice/logInSlice";
import UserNavBar from "./components/navbar/UserNavBar";
import { Outlet } from "react-router-dom";
function App() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="lg:grid lg:grid-cols-12 sm:flex sm:flex-col h-screen">
        <div className="h-12  bg-violet-500 col-span-12">
          <UserNavBar />
        </div>

        {/* Red Div: Hidden on small screens, visible on medium screens and above */}
        <div className="h-full bg-red-600 hidden lg:col-span-3 lg:block"></div>

        {/* Green Div: Always visible */}
        <div className="h-full bg-green-600 lg:col-span-6 sm:flex-grow">
          <Outlet />
        </div>

        {/* Blue Div: Hidden on small screens, visible on medium screens and above */}
        <div className="h-full bg-blue-600 hidden lg:col-span-3 lg:block"></div>

        {/* Yellow Div: Visible on small screens, hidden on medium screens and above */}
        <div className="h-16 bg-yellow-500 block lg:hidden"></div>
      </div>
    </>
  );
}

export default App;
