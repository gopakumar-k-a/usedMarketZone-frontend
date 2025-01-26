import { getBidTransactions } from "@/api/admin";
import PaymentFilterComponent from "@/components/admin/bidTransaction/PaymentFilterComponent";
import ShipmentFilterComponent from "@/components/admin/bidTransaction/ShipmentFilter";
import TransactionReportTable from "@/components/admin/transactionReport/TransactionReportTable";
import { Pagination } from "@/components/pagination/Pagination";
import { SortDropdown } from "@/components/sort/SortDropDown";
import { Transaction } from "@/types/admin/transaction";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function AdminBidReportPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [totalBidAmount,setTotalBidAmount]=useState(0)
  const [searchParams] = useSearchParams();
  const limit = 5;
  const fetchBidTransactions = async (
    page: number = 1,
    search: string | null = "",
    sort: string | null,
    shipmentStatus: string,
    paymentStatus: string,
    toDate: string="",
    fromDate: string=""
  ) => {
    const { transactions, totalDocuments } = await getBidTransactions(
      page,
      search,
      sort,
      limit,
      shipmentStatus,
      paymentStatus,
      toDate, fromDate
    );
    console.log("transactions ", transactions);

    if(transactions){

      let sum=transactions.reduce((acc,transaction)=>{
         return acc+transaction.wonPrice
         },0)
         setTotalBidAmount(sum)

    }

    setTransactions(transactions);
    setTotalDocuments(totalDocuments);
  };
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const search = searchParams.get("search") ? searchParams.get("search") : "";
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "";
  const shipmentStatus = searchParams.get("shipmentStatus") || "";
  const paymentStatus = searchParams.get("paymentStatus") || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";
  useEffect(() => {
    fetchBidTransactions(
      page,
      search,
      sort,
      shipmentStatus,
      paymentStatus,
      toDate,
      fromDate
    );
  }, [page, search, sort, shipmentStatus, paymentStatus, toDate, fromDate]);
  const options = [
    { value: "createdAt_desc", label: "Newest" },
    { value: "createdAt_asc", label: "Oldest" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];
  return (
    <>
      <div className="flex justify-items-center items-center ">
        <img
          src="/UMP-LOGO-final.png"
          alt="Logo"
          className="h-24 mb-4 dark:filter dark:invert"
        />
        <h1 className="font-poppins font-bold dark:text-white text-xl">
          Transaction Report
        </h1>
      </div>
      <div className="flex gap-2">
        <SortDropdown options={options} />
        <ShipmentFilterComponent />
        <PaymentFilterComponent />
        {/* <DateRangeFilter /> */}
      </div>
      {transactions && transactions.length > 0 && (
        <TransactionReportTable transactions={transactions} />
      )}
      {transactions && transactions.length > 0 && (
        <Pagination pageSize={limit} totalCount={totalDocuments} />
      )}

      {
        transactions&& totalBidAmount&&
     <p>total bid amount {totalBidAmount}</p>
      }


    </>
  );
}

export default AdminBidReportPage;
