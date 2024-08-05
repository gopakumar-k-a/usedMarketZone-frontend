import { useEffect, useState } from "react";
import { TransactionActionDialogue } from "./TransactionActionDialogue";
import { PiDotsThreeCircleDuotone } from "react-icons/pi";
import { getBidTransactions } from "@/api/admin";
import { Transaction } from "@/types/admin/transaction";

// const transactions = [
//   {
//     productId: "66a78f552cb99608787544be",
//     shipmentStatus: "shipped_to_admin",
//     paymentStatus: "escrow",
//     price: 35000,
//     transactionId: "66acc08850c9c4254a90d98d",
//   },
//   {
//     productId: "anotherProductId",
//     shipmentStatus: "shipmentStatus",
//     paymentStatus: "paymentStatus",
//     price: "anotherPrice",
//     transactionId: "anotherTransactionId",
//   },
// ];

const updateShipmentStatus = (transactionId, newStatus) => {
  // Implement the logic to update shipment status
  console.log(`Updating shipment status for ${transactionId} to ${newStatus}`);
  // Make API call here
};

const confirmReceipt = (transactionId) => {
  // Implement the logic to confirm receipt
  console.log(`Confirming receipt for ${transactionId}`);

  // Make API call here
};

function BidTransactionMain() {
  const [isTransactionActionDialogueOpen, setTransactionActionDialogueOpen] =
    useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const fetchBidTransactions = async () => {
    const { transactions } = await getBidTransactions();
    setTransactions(transactions);
  };
  useEffect(() => {
    fetchBidTransactions();
  }, []);
  const handleTransactionActionModalOpen = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setTransactionActionDialogueOpen(true);
  };
  const onUpdateTransaction = (
    transactionId: string,
    newStatus: string,
    buyerTrackingNumber: string | null
  ) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.transactionId === transactionId
          ? {
              ...transaction,
              shipmentStatus: newStatus,
              trackingNumbers: {
                ...transaction.trackingNumbers,
                shippedToBuyerTrackingNumber: buyerTrackingNumber,
              },
            }
          : transaction
      )
    );
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product ID
              </th>
              <th scope="col" className="px-6 py-3">
                Shipment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Base Bid Price
              </th>
              <th scope="col" className="px-6 py-3">
                Bid won price
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.productId}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">{transaction.productId}</td>
                {transaction.transactionId ? (
                  <>
                    <td className="px-6 py-4">{transaction.shipmentStatus}</td>
                    <td className="px-6 py-4">
                      {transaction.transactionStatus}
                    </td>
                  </>
                ) : (
                  <td>transaction Not Done</td>
                )}

                <td className="px-6 py-4">{transaction.baseBidPrice}</td>
                <td className="px-6 py-4">{transaction.wonPrice}</td>
                <td className="px-6 py-4">
                  <PiDotsThreeCircleDuotone
                    className="h-6 w-6"
                    onClick={() =>
                      handleTransactionActionModalOpen(transaction)
                    }
                  />
                  {/* <button
                    onClick={() =>
                      updateShipmentStatus(
                        transaction.transactionId,
                        "received_by_admin"
                      )
                    }
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Update Status
                  </button>
                  <button
                    onClick={() => confirmReceipt(transaction.transactionId)}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Confirm Receipt
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isTransactionActionDialogueOpen && selectedTransaction && (
        <TransactionActionDialogue
          isOpen={isTransactionActionDialogueOpen}
          onClose={() => setTransactionActionDialogueOpen(false)}
          transaction={selectedTransaction}
          onUpdateTransaction={onUpdateTransaction}
        />
      )}
    </>
  );
}

export default BidTransactionMain;
