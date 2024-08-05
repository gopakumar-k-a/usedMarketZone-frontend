import BidTransactionMain from "@/components/admin/bidTransaction/BidTransactionMain";
import PageHeading from "@/components/admin/PageHeading";
import { PiPackageFill } from "react-icons/pi";

function BidTransactionPage() {
  return (
    <>
      <PageHeading heading={"Bid Transactions"} Icon={PiPackageFill} />
      <BidTransactionMain />
    </>
  );
}

export default BidTransactionPage;
