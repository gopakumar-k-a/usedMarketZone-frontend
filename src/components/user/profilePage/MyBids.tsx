import { getUserWistBid } from "@/api/bid";
import { useEffect, useState } from "react";
import { UserProfileMyBids } from "@/types/bid";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatDate, isBefore } from "date-fns";
import { Badge } from "@/components/ui/badge";
function MyBids() {

  const navigate=useNavigate()
  const [myBids, setMyBids] = useState<UserProfileMyBids[]>([]);
  const fetchUserBids = async () => {
    try {
      const res = await getUserWistBid();

      if (res && res.userBids) {
        setMyBids(res.userBids);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserBids();
  }, []);
  const isExpired = (time: Date) => isBefore(time, Date.now());
  return (
    <>
      <div className="flex justify-center w-full   h-screen">
        {/* <div className="flex gap-5"> */}
        <div className="w-full sm:w-8/12 h-screen  flex flex-col gap-3">
          {/* cards start */}

          {myBids && myBids.length > 0 ? (
            myBids.map((bid) => {
              return (
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-lg">
                  <div className="flex p-4">
                    <div className="ml-2 max-w-16 max-h-16">
                      <img
                        src={bid?.productImageUrls[0]}
                        alt="Quant trident shirts"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <div className="p-2 flex-grow">
                      <div className="flex justify-between items-start">
                        <div className="text-sm">
                          <h5 className="font-bold text-xl dark:text-white">
                            {bid?.productName}
                          </h5>
                          <p className="dark:text-gray-300  font-medium">
                            Category: {bid?.category}
                          </p>
                          <p className="dark:text-gray-300  font-medium">
                            Sub Category: {bid?.subCategory}
                          </p>
                          {bid.isAdminAccepted && (
                            <p className="dark:text-gray-300  font-medium">
                              bid EndTime:
                              <span
                                className={`${isExpired(new Date(bid.bidEndTime)) ? "text-red-500" : "text-green-500"} font-medium `}
                              >
                                {formatDate(
                                  bid.bidEndTime,
                                  "hh:mm:ss a , dd-MM-yyyy "
                                )}
                              </span>
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <h4 className="text-xl font-bold dark:text-white">
                            ₹ {bid?.basePrice}
                          </h4>
                          {/* Uncomment these lines if you need to display bid duration and requested time */}
                          {/* <span className="text-gray-500 dark:text-gray-400">
            Bid Duration: 1 day 0 hour 0 minute
          </span>
          <h6 className="text-gray-500 dark:text-gray-400">
            Requested Time: 02:55 PM
          </h6> */}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex justify-start items-center gap-2">
                      <div className="flex items-center flex-col">
                        {bid.isAdminAccepted ? (
                          <>
                            <Link
                              to={"/post/post-details"}
                              state={{ pId: bid?._id }}
                            >
                              <div className="bg-blue-400 hover:bg-blue-500 h-6 w-6 flex items-center justify-center rounded">
                                <FaEye className="h-4 w-4 text-white" />
                              </div>
                            </Link>
                            <div className="mt-2">
                              {isExpired(new Date(bid.bidEndTime)) ? (
                                <>
                                <div className="flex flex-col gap-2">

                                  <Badge variant="destructive">bid ended</Badge>

                                  <Button className="bg-green-500 hover:bg-green-600 text-white"
                                  onClick={()=>navigate("/bid-result",{state:{bidId:bid._id}})}>Results</Button>
                                </div>
                                </>
                              ) : (
                                <Badge className="text-white bg-green-500">
                                  active
                                </Badge>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-blue-400 hover:bg-blue-500 opacity-50 h-6 w-6 flex items-center justify-center rounded">
                              <FaEye className="h-4 w-4 text-white" />
                            </div>
                            <Badge variant="destructive" className="mt-2">
                              admin not verified
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>no bids</div>
          )}
          {/* cards ends */}
        </div>

        {/* </div> */}
      </div>
    </>
  );
}

export default MyBids;
