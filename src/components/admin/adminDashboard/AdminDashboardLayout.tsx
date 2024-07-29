import { getDashboardStatistics } from "@/api/admin";
import React, { useEffect, useState } from "react";
import { FaUsers, FaBox, FaFlag } from "react-icons/fa";
import { AdminStatistics } from "@/types/admin/dashboard";
import AdminStatisticsChart from "./AdminStatisticsChart";
function AdminDashboardLayout() {
  const [adminStatistics, setAdminStatistics] =
    useState<AdminStatistics | null>(null);
  const fetchStatistics = async () => {
    const { statistics } = await getDashboardStatistics();
    setAdminStatistics(statistics);
  };

  useEffect(() => {
    fetchStatistics();
  }, []);
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full h-auto md:h-32">
        <div className="border-2 border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between w-full h-full rounded-lg">
            <div className="p-3 rounded-lg">
              <h1 className="text-lg font-medium">no of users</h1>
              <h1 className="text-lg font-medium">
                {adminStatistics?.numberOfUsers}
              </h1>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FaUsers className="text-2xl" />
            </div>
          </div>
        </div>
        <div className="border-2 border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between w-full h-full rounded-lg">
            <div className="p-3 rounded-lg">
              <h1 className="text-lg font-medium">
                no of products : {adminStatistics?.numberOfProducts}
              </h1>
              {/* <h1 className="text-lg font-medium">
                Bid products : {adminStatistics?.numberOfBidProducts}
              </h1>
              <h1 className="text-lg font-medium">
                Sell products : {adminStatistics?.numberOfNonBidProducts}
              </h1> */}
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FaBox className="text-2xl" />
            </div>
          </div>
        </div>
        <div className="border-2 border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between w-full h-full rounded-lg">
            <div className="p-3 rounded-lg">
              <h1 className="text-lg font-medium">post reports</h1>
              <h1 className="text-lg font-medium">
                {adminStatistics?.numberOfReports}
              </h1>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FaFlag className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full h-auto md:h-40">
        <div className="border-2 border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between w-full h-full rounded-lg">
            <div className="p-3 rounded-lg"></div>
            <div className="bg-blue-50 p-3 rounded-lg">
              {/* <FaUsers className="text-2xl" /> */}
              {adminStatistics && (
                <AdminStatisticsChart stats={adminStatistics} />
              )}
            </div>
          </div>
        </div>
        <div className="border-2 border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between w-full h-full rounded-lg">
            <div className="p-3 rounded-lg">
              <h1 className="text-lg font-medium">ds</h1>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FaUsers className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
