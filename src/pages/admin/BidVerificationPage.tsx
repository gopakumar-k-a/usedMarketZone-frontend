import React, { useEffect, useState } from "react";
import { getBidRequests } from "@/api/admin";
import BidRequestCard from "@/components/admin/bidRequests/BidRequestCard";
import { IoHammerOutline } from "react-icons/io5";

import PageHeading from "@/components/admin/PageHeading";
interface Bid {
  _id: {
    $oid: string;
  };
  bidderId: {
    $oid: string;
  };
  bidProductId: {
    $oid: string;
  };
  isAccepted: boolean;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
}

function BidVerificationPage() {
  const [bidRequests, setBidRequests] = useState([]);

  const getBidData = async () => {
    await getBidRequests().then((response) => {
      console.log("getBidRequests ", response.bidRequests);

      setBidRequests(response.bidRequests);
    });
  };

  useEffect(() => {
    getBidData();
  }, []);

  return (
    <>
    <PageHeading heading={"Bid Verfication"} Icon={IoHammerOutline}/>
    
      <section className="bg-gray-100 py-5 flex  justify-center">

        <div className="w-10/12 ">
          {bidRequests &&
            bidRequests.map((request) => <BidRequestCard request={request} />)}
        </div>
      </section>
    </>
  );
}

export default BidVerificationPage;
