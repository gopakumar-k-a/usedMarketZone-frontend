import { useEffect, useState } from "react";
import { getBidRequests } from "@/api/admin";
import BidRequestCard from "@/components/admin/bidRequests/BidRequestCard";
import { IoHammerOutline } from "react-icons/io5";

import PageHeading from "@/components/admin/PageHeading";
import { useSearchParams } from "react-router-dom";
import { SortDropdown } from "@/components/sort/SortDropDown";
import { DebouncedSearchInput } from "@/components/debounceSearch/DebouncedSearchInput";
import { Pagination } from "@/components/pagination/Pagination";
import { BidRequest } from "@/types/admin/bidRequest";

function BidVerificationPage() {
  const [bidRequests, setBidRequests] = useState<BidRequest[] | null>(null);
  const [searchParams] = useSearchParams();
  const [totalDocuments, setTotalDocuments] = useState(0);
  const pageSize = 5;
  const getBidData = async (
    page: number = 1,
    search: string | null = "",
    sort: string | null
  ) => {
    await getBidRequests(page, search, sort, pageSize).then((response) => {
      console.log("getBidRequests ", response.bidRequests);

      setBidRequests(response.bidRequests);
      setTotalDocuments(response.totalDocuments);
    });
  };

  useEffect(() => {
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : 1;
    const search = searchParams.get("search") ? searchParams.get("search") : "";
    const sort = searchParams.get("sort") ? searchParams.get("sort") : "";
    getBidData(page, search, sort);
  }, [searchParams]);
  const options = [
    { value: "createdAt_desc", label: "Newest" },
    { value: "createdAt_asc", label: "Oldest" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];
  return (
    <>
      <PageHeading heading={"Bid Verfication"} Icon={IoHammerOutline} />
      <div className="flex gap-2">
        <DebouncedSearchInput />
        <SortDropdown options={options} />
      </div>
      <section className="bg-gray-100 py-5 flex  justify-center ">
        <div className="w-10/12 ">
          {bidRequests &&
            bidRequests.length > 0 &&
            bidRequests.map((request) => <BidRequestCard request={request} />)}
        </div>
      </section>
      {bidRequests && bidRequests.length > 0 && (
        <Pagination pageSize={pageSize} totalCount={totalDocuments} />
      )}
    </>
  );
}

export default BidVerificationPage;
