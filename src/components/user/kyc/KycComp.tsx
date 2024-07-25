import { Badge } from "@/components/ui/badge";
import KycDialogue from "../Settings/KycDialogue";
import { useEffect, useState } from "react";
import { getMyKycData } from "@/api/user";
import { MyKycData } from "@/types/user";
import LoadingButton from "@/components/loadingButton/LoadingButton";

function KycComp() {
  const [isKycDialogueOpen, setKycDialogueOpen] = useState(false);
  const [myKycData, setMyKycData] = useState<MyKycData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMyKycData = async () => {
    try {
      setLoading(true);
      const { kycData } = await getMyKycData();
      console.log("kycData ", kycData);

      setMyKycData(kycData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setKycDialogueOpen(false);
    }
  };

  useEffect(() => {
    fetchMyKycData();
  }, []);

  const renderKycStatus = () => {
    if (loading) {
      return <LoadingButton buttonText="Loading" />;
    }
    if (!myKycData) {
      return (
        <Badge
          className="cursor-pointer bg-blue-400 text-white"
          onClick={() => setKycDialogueOpen(true)}
        >
          Complete KYC
        </Badge>
      );
    }
    switch (myKycData.status) {
      case "pending":
        return (
          <>
            <Badge className="cursor-pointer bg-yellow-400 text-white">
              pedning
            </Badge>
            <h1 className="text-red-400">admin is verifying Request</h1>
          </>
        );
      case "accepted":
        return (
          <Badge className="cursor-pointer bg-green-400 text-white">
            completed
          </Badge>
        );
      case "rejected":
        return (
          <>
            <Badge className="cursor-pointer bg-red-400 text-white">
              rejected
            </Badge>
            <h1 className="text-red-400">
              admin Rejected Request Click To
              <Badge onClick={() => setKycDialogueOpen(true)}>
                {" "}
                Add New Request
              </Badge>
            </h1>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Get Verified</h1>
        <div className="ml-4">{renderKycStatus()}</div>
      </div>
      {isKycDialogueOpen && (
        <KycDialogue
          isKycDialogueOpen={isKycDialogueOpen}
          setKycDialogueOpen={setKycDialogueOpen}
        />
      )}
    </>
  );
}

export default KycComp;
