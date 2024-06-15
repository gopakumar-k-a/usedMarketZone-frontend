import React, { useState,useEffect } from "react";
import { DataTableDemo } from "@/components/admin/userManagement/UserManagementTable";
import { User, columns } from "../../components/admin/userManagement/columns";
import { DataTable } from "../../components/admin/userManagement/data-table";
import { getAllUsers } from "@/api/admin";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
const {userData}=await getAllUsers(1,5)

// const [data]

console.log('user data ',userData);
return userData


}


function UserManagement() {


  const [userData, setUserData] = useState<User[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const data = await getData();
    setUserData(data);
  };
  fetchData();
}, []);

  return (
    <div>
      <h1 className="dark:text-white text-black ">
        {" "}
        this is user management page
      </h1>
      <div className="container mx-auto py-10">
        {/* <DataTable columns={columns} data={userData} setUserData={setUserData} /> */}
        <DataTable columns={columns(userData,setUserData)} data={userData}  />
      </div>
    </div>
  );
}

export default UserManagement;
