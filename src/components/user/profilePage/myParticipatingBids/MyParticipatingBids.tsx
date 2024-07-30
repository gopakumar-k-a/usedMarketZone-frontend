import { getParticipatingBids } from "@/api/bid";
import { useEffect, useState } from "react";
import UserParticipatingBidCard from "./UserParticipatingBidCard";
import { UserParticipatingBid } from "@/types/bid";

function MyParticipatingBids() {
  const [participatingBids, setParticipatingBids] = useState<
    UserParticipatingBid[]
  >([]);

  const fetchUserParticipatingBids = async () => {
    const { userParticipatingBids } = await getParticipatingBids();
    setParticipatingBids(userParticipatingBids);
  };
  useEffect(() => {
    fetchUserParticipatingBids();
  }, []);
  return (
    <>
      <h1>my participating bids</h1>
      <div className="flex justify-center w-full   h-screen">
        {/* <div className="flex gap-5"> */}
        <div className="w-full sm:w-8/12 h-screen  flex flex-col gap-3">
          {participatingBids && participatingBids.length > 0 ? (
            participatingBids.map((bid) => (
              <UserParticipatingBidCard key={bid._id} bid={bid} />
            ))
          ) : (
            <>
              <div>no participation</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyParticipatingBids;
