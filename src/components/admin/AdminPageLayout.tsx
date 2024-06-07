import React from "react";
import { Outlet } from "react-router-dom";

function AdminPage() {
  return (
    <div>
      <h1 className="font-extrabold">this is admin layout</h1>
      <div className="bg-purple-700 h-screen grid grid-cols-12">
        <div className="bg-orange-600 h-3/5"> 
        <h1>space for navbar</h1></div>
        <div className="bg-green-600 h-3/5 col-span-5">
          <h1>space for admin children</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
