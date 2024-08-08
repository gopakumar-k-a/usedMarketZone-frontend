import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Transaction } from "@/types/admin/transaction";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomAlertDialogue } from "@/components/alert/CustomAlertDialogue";
import {
  changeTransactionStatusToAdminRecieved,
  markProductAsDelivered,
  sendProductToWinner,
} from "@/api/admin";

export function TransactionActionDialogue({
  isOpen,
  onClose,
  transaction,
  onUpdateTransaction,
}: {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  onUpdateTransaction: (
    transactionId: string,
    newStatus: string,
    buyerTrackingNumber: string | null
  ) => void;
}) {
  const navigate = useNavigate();
  const shipmentStatuses = [
    "shipped_to_admin",
    "received_by_admin",
    "shipped_to_buyer",
    "delivered",
  ];
  const [isSaving, setIsSaving] = useState(false);
  const [selectedShipmentStatus, setSelectedShipmentStatus] = useState(
    transaction.shipmentStatus
  );
  const [buyerTrackingNumber, setBuyerTrackingNumber] = useState("");
  const handleShipmentStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedShipmentStatus(event.target.value);
  };
  const [initialShipmentStatus] = useState(transaction.shipmentStatus);

  const handleSaveChanges = async () => {
    if (selectedShipmentStatus !== initialShipmentStatus) {
      console.log("shipment status", selectedShipmentStatus);

      switch (selectedShipmentStatus) {
        case "received_by_admin":
          try {
            setIsSaving(true);
            await changeTransactionStatusToAdminRecieved(
              transaction.transactionId
            ).then(() => {
              setSelectedShipmentStatus("shipped_to_admin");
              onUpdateTransaction(
                transaction.transactionId,
                "received_by_admin",
                null
              );

              onClose();
            });
          } catch (error) {
            console.log(error);
          } finally {
            setIsSaving(false);
          }
          break;
        case "shipped_to_buyer":
          try {
            if (buyerTrackingNumber == "") return;
            setIsSaving(true);
            await sendProductToWinner(
              transaction.transactionId,
              buyerTrackingNumber
            ).then(() => {
              setSelectedShipmentStatus("shipped_to_admin");
              onUpdateTransaction(
                transaction.transactionId,
                "shipped_to_admin",
                buyerTrackingNumber
              );

              onClose();
            });
          } catch (error) {
            console.log(error);
          } finally {
            setIsSaving(false);
          }

          break;
        case "delivered":
          try {
            setIsSaving(true);
            await markProductAsDelivered(
              transaction.transactionId,
              transaction.ownerId,
              transaction.productId,
              transaction.bidId
            ).then(() => {
              setSelectedShipmentStatus("delivered");
              onUpdateTransaction(
                transaction.transactionId,
                "delivered",
                buyerTrackingNumber
              );

              onClose();
            });
          } catch (error) {
            console.log(error);
          } finally {
            setIsSaving(false);
          }

          break;
        default:
          console.log("invalid select");
      }
    } else {
      console.log("No changes in shipment status.");
    }
  };

  const handleBuyerTrackingNumberChange = (buyerTrackingNumber: string) => {
    setBuyerTrackingNumber(buyerTrackingNumber);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Edit Bid Order Status
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Make changes to the order here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h1 className="dark:text-white font-bold text-xl mb-2">
            Bid Details
          </h1>
          <p>
            <span className="font-medium">Shipment Status:</span>
            {initialShipmentStatus == "delivered" ? (
              <select
                value={initialShipmentStatus}
                className="ml-2 border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
              >
              
                  <option  value='delivered'>
                  delivered
                  </option>
          
              </select>
            ) : (
              <select
                value={selectedShipmentStatus}
                onChange={handleShipmentStatusChange}
                className="ml-2 border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
              >
                {shipmentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            )}
          </p>
          {selectedShipmentStatus !== initialShipmentStatus &&
            selectedShipmentStatus === "shipped_to_buyer" && (
              <div className="mt-4">
                <label
                  htmlFor="trackingNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Tracking Number
                </label>
                <input
                  type="text"
                  id="trackingNumber"
                  value={buyerTrackingNumber}
                  onChange={(e) =>
                    handleBuyerTrackingNumberChange(e.target.value)
                  }
                  className="mt-1 block w-full border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
                />
              </div>
            )}
          {selectedShipmentStatus !== initialShipmentStatus && !isSaving && (
            <>
              <Button type="submit" onClick={() => handleSaveChanges()}>
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </>
          )}
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">
              <span className="mr-2">Bid Winner Address:</span>
              <div className="text-blue-500">
                {transaction.claimerAddress.country}{" "}
                {transaction.claimerAddress.state},
                {transaction.claimerAddress.district}{" "}
                {transaction.claimerAddress.city},
                {transaction.claimerAddress.postalCode} (
                {transaction.claimerAddress.phone})
              </div>
            </p>
            <p>
              <span className="font-medium">
                Shipped to Admin Tracking Number:
              </span>
              {transaction.trackingNumbers.shippedToAdminTrackingNumber ||
                " Not shipped to admin yet"}
            </p>
            <p>
              <span className="font-medium">
                Shipped to Winner Tracking Number:
              </span>
              {transaction.trackingNumbers.shippedToBuyerTrackingNumber ||
                " Not shipped to buyer yet"}
            </p>
            <p>
              <span className="font-medium">Base Bid Price:</span>{" "}
              {transaction.baseBidPrice}
            </p>
            <p>
              <span className="font-medium">Bid Won Price:</span>{" "}
              {transaction.wonPrice}
            </p>
            <p>
              <span className="font-medium">Bid ID:</span> {transaction.bidId}
            </p>
            <p>
              <span className="font-medium">Product ID:</span>

              <span
                className="cursor-pointer text-blue-500"
                onClick={() =>
                  navigate("/admin/bid-history", {
                    state: { bidProductData: transaction.productData },
                  })
                }
              >
                {" "}
                {transaction.productId}
              </span>
            </p>
            <p>
              <span className="font-medium">Winner ID:</span>
              <span
                className="cursor-pointer text-blue-500"
                onClick={() =>
                  navigate("/admin/user-profile", {
                    state: { userId: transaction.bidWinnerId },
                  })
                }
              >
                {" "}
                {transaction.bidWinnerId}
              </span>
            </p>
            <p>
              <span className="font-medium">Owner ID:</span>
              <span
                className="cursor-pointer text-blue-500"
                onClick={() =>
                  navigate("/admin/user-profile", {
                    state: { userId: transaction.ownerId },
                  })
                }
              >
                {" "}
                {transaction.ownerId}
              </span>
            </p>
            <p>
              <span className="font-medium">Shipment Status:</span>{" "}
              {transaction.shipmentStatus}
            </p>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
