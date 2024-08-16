import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WalletHistory from "./WalletHistory";
import { getWalletData } from "@/api/payment";
import { useEffect, useState } from "react";
import { Wallet } from "@/types/wallet";
import Loader from "@/components/loader/Loader";

const WalletDialgoue = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [walletData, setWalletData] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const { wallet } = await getWalletData();
      setWalletData(wallet);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Wallet</DialogTitle>
            <DialogDescription>
              Manage your wallet details here. Click submit when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-end mr-4">
              <h1 className="dark:text-white  text-lg">balance</h1>
              <h1 className="dark:text-white font-bold text-2xl ml-2">
                {walletData ? `${walletData.walletBalance}₹` : 0}
              </h1>
            </div>
            {walletData &&
              walletData.walletHistory &&
              walletData.walletHistory.length > 0 && (
                <WalletHistory walletHistory={walletData.walletHistory} />
              )}
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {loading && <Loader />}
    </>
  );
};

export default WalletDialgoue;
