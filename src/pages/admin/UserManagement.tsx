import React, { useState, useEffect } from "react";
import { DataTable } from "../../components/admin/userManagement/data-table";
import { getAllUsers } from "@/api/admin";
import Pagination from "@/components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { User, columns } from "../../components/admin/userManagement/columns";

function UserManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [userData, setUserData] = useState<User[]>([]);

  const limit = 5; 
  useEffect(() => {
    const fetchData = async () => {
      const pageParam = parseInt(searchParams.get("page") || "1");
      setCurrentPage(pageParam);

      const { userData, totalDocuments } = await getAllUsers(pageParam, limit);
      setTotalPages(Math.ceil(totalDocuments / limit));
      setUserData(userData);
    };

    fetchData();
  }, [searchParams]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });

    const { userData } = await getAllUsers(page, 5); 
    setUserData(userData);
  };

  return (
    <div>
      <h1 className="dark:text-white text-black">User Management Page</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns(userData, setUserData,currentPage,limit)} data={userData} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default UserManagement;
