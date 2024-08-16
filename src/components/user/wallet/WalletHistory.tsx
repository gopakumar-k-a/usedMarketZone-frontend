import { WalletHistoryItem } from "@/types/wallet";
import { Link } from "react-router-dom";

const WalletHistory = ({
  walletHistory,
}: {
  walletHistory: WalletHistoryItem[];
}) => {
  return (
    <div className="max-h-60 overflow-y-auto">
      <h2 className="text-lg font-medium mb-2">Wallet History</h2>
      <ul className="space-y-2">
        {walletHistory.length > 0 ? (
          walletHistory.map((transaction) => (
            <li
              key={transaction._id}
              className="flex justify-between border-b pb-2"
            >
              <span>
                {new Date(transaction.createdAt).toLocaleDateString()}
              </span>
              <span
                className={`${transaction.type == "credit" ? "text-green-500" : "text-red-500"}`}
              >
                {transaction.amount}
              </span>
              <span>{transaction.type === "credit" ? "Credit" : "Debit"}</span>
              <Link
                to={"/claim-bid"}
                state={{ productId: transaction.productId?._id }}
              >
                <span>{ transaction.productId?._id}</span>
              </Link>
              {/* <span className="cursor-pointer"   onClick={()=>
                navigate("/claim-bid",{state:{transaction?.productId?._id}})}>{transaction.productId?._id}</span> */}
            </li>
          ))
        ) : (
          <li>No transactions found</li>
        )}
      </ul>
    </div>
  );
};

export default WalletHistory;
