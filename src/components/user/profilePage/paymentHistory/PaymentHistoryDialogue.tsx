import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { getPaymentHistoryUser } from "@/api/payment";
import { PaymentHistoryUser } from "@/types/razorpay";
import { formatDate } from "@/utils/formatDate";
const PaymentHistoryDialogue = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryUser[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      const { transactionHistory } = await getPaymentHistoryUser();
      setPaymentHistory(transactionHistory);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment History</DialogTitle>
          <DialogDescription>Review your past payments here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {loading ? (
            <p>Loading...</p>
          ) : paymentHistory.length > 0 ? (
            paymentHistory.map((item) => (
              <div key={item._id} className="flex justify-between">
                <div className="text-left">
                  <p className="font-medium">{item.productId}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{item.amount / 100}₹</p>
                </div>
              </div>
            ))
          ) : (
            <p>No payment history available.</p>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentHistoryDialogue;
