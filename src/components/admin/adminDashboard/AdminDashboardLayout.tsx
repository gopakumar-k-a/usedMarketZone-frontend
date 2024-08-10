import { getDashboardStatistics, getTransactionStatisctics } from "@/api/admin";
import React, { useEffect, useState } from "react";
import { FaUsers, FaBox, FaFlag } from "react-icons/fa";
import { AdminStatistics } from "@/types/admin/dashboard";
import AdminStatisticsChart from "./AdminStatisticsChart";
import {
  RecentTransactions,
  ShipmentCount,
  TransactionCount,
} from "@/types/transactions";
import PieChartTransaction from "./chart/PieChartTransaction";
import { Doughnut } from "react-chartjs-2";
import { ShipmentStatus } from "@/types/bid";
import TransactionCard from "./TransacionCard";
function AdminDashboardLayout() {
  const [adminStatistics, setAdminStatistics] =
    useState<AdminStatistics | null>(null);
  const [transactionStatistics, setTransactionStatistics] =
    useState<TransactionCount | null>(null);
  const [shipmentStatistics, setShipmentStatistics] =
    useState<ShipmentCount | null>(null);

  const [recentTransactions, setRecentTransactions] = useState<
    RecentTransactions[] | null
  >(null);

  // const [shipmentChartData,setShipmentChartData]=useState(null)
  const fetchStatistics = async () => {
    const { statistics } = await getDashboardStatistics();
    setAdminStatistics(statistics);
  };

  const fetchTransactionStatisctics = async () => {
    const { transactions, lastTransactions } =
      await getTransactionStatisctics();
    setRecentTransactions(lastTransactions);
    const possibleStatuses: Array<
      "captured" | "failed" | "escrow" | "released"
    > = ["captured", "failed", "escrow", "released"];
    const possibleShipmentStatuses: ShipmentStatus[] = [
      "not_shipped",
      "shipped_to_admin",
      "received_by_admin",
      "shipped_to_buyer",
      "delivered",
    ];

    const statusCounts = transactions.reduce(
      (acc, transaction) => {
        const status = transaction.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      possibleStatuses.reduce(
        (acc, status) => {
          acc[status] = 0;
          return acc;
        },
        {} as Record<"captured" | "failed" | "escrow" | "released", number>
      )
    );

    type ShipmentCount = Record<ShipmentStatus, number>;

    const initialShipmentCount: ShipmentCount = possibleShipmentStatuses.reduce(
      (acc, status) => {
        acc[status] = 0;
        return acc;
      },
      {} as ShipmentCount
    );

    const shipmentCount = transactions.reduce((acc, transaction) => {
      const shipmentStatus = transaction.shipmentStatus as ShipmentStatus;
      acc[shipmentStatus] = (acc[shipmentStatus] || 0) + 1;
      return acc;
    }, initialShipmentCount);

    setTransactionStatistics(statusCounts);
    setShipmentStatistics(shipmentCount);
  };
  useEffect(() => {
    fetchStatistics();
    fetchTransactionStatisctics();
  }, []);

  const shipmentChartData = {
    labels: [
      "not shipped",
      "shipped to admin",
      "received by admin",
      "shipped to buyer",
      "delivered",
    ],
    datasets: [
      {
        label: "number of orders",
        data: [
          shipmentStatistics?.not_shipped,
          shipmentStatistics?.shipped_to_admin,
          shipmentStatistics?.received_by_admin,
          shipmentStatistics?.shipped_to_buyer,
          shipmentStatistics?.delivered,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full h-auto md:h-32 p-3">
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
              {/* <Doughnut data={data} />; */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full h-auto md:h-40 p-3">
        <div className="border-2 border-gray-200 rounded-lg p-3">
          <div className="flex justify-center w-full h-full rounded-lg">
            <div className="p-3 rounded-lg"></div>

            <div className="bg-blue-50 p-3 rounded-lg flex items-center flex-col">
              <h1>Product Statisctics</h1>
              {/* <FaUsers className="text-2xl" /> */}
              {adminStatistics && (
                <AdminStatisticsChart stats={adminStatistics} />
              )}
            </div>
          </div>
        </div>
        <div className="border-2 border-gray-200 rounded-lg p-3">
          <div className="flex flex-col justify-center w-full h-full rounded-lg">
            <h1 className="text-lg font-medium">last transactions</h1>
            <div className="w-full h-64 overflow-y-auto p-3 rounded-lg bg-gray-500">
              {recentTransactions &&
                recentTransactions.length > 0 &&
                recentTransactions.map((transaction) => (
                  <TransactionCard
                    transactionData={transaction}
                    key={transaction._id}
                  />
                ))}
            </div>
          </div>
        </div>
        {/* new row */}
        <div className="border-2 border-gray-200 rounded-lg p-3">
          <div className="flex justify-center  w-full h-full rounded-lg">
            <div className="p-3 rounded-lg"></div>
            <div className="bg-blue-50 p-3 rounded-lg flex items-center flex-col">
              <h1>transaction statistics</h1>
              {transactionStatistics && (
                <PieChartTransaction data={transactionStatistics} />
              )}
            </div>
          </div>
        </div>
        <div className="border-2 border-gray-200 rounded-lg p-3">
          <div className="flex justify-center  w-full h-full rounded-lg">
            <div className="p-3 rounded-lg"></div>
            <div className="bg-blue-50 p-3 rounded-lg flex items-center flex-col">
              <h1>Shipment Statistics</h1>
              {shipmentStatistics && <Doughnut data={shipmentChartData} />}
            </div>
          </div>
        </div>
        {/* new row end  */}
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
