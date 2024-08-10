import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RecentTransactions } from "@/types/transactions";
// interface TransactionCardProps {
//   id: string;
//   username: string;
//   date: string;
//   amount: number;
//   productId: string;
// }

const TransactionCard = ({
  transactionData,
}: {
  transactionData: RecentTransactions;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white text-black rounded-lg dark:bg-[#1f2937] dark:text-white mb-2">
        <div>
          <div
            className="cursor-pointer font-semibold text-blue-500 dark:text-teal-400"
            onClick={() =>
              navigate("/admin/user-profile", {
                state: { userId: transactionData.fromUserId },
              })
            }
          >
            {transactionData.fromUserName}
          </div>
          <p className="text-blue-500 dark:text-teal-400 font-semibold cursor-pointer">
            <span className="text-black dark:text-white font-semibold cursor-default">
              {" "}
              product:
            </span>{" "}
            <span   
            //    onClick={() =>
            //     navigate("/admin/bid-history", {
            //       state: { bidProductData: product },
            //     })
            //   }
              >

            {transactionData.productId}
            </span>
          </p>
        </div>
        <div className="text-gray-500 dark:text-gray-300">
          <div className="flex flex-col">
            <p>{formatDate(transactionData.createdAt)}</p>
          </div>
        </div>
        <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 dark:bg-teal-400 dark:text-black dark:hover:bg-teal-500">
        ₹{transactionData.amount / 100}
        </Button>
      </div>
    </>
  );
};

export default TransactionCard;
