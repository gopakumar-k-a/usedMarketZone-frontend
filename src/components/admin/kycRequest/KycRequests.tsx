import { useEffect, useState } from "react";
import KycRequestCard from "./KycRequestCard";
import { getKycDataAdmin } from "@/api/admin";
import { KycDataWithUserData } from "@/types/user";
import KycDetailsModal from "./KycDetailsModal";

function KycRequests() {
  const [kycData, setKycData] = useState<KycDataWithUserData[]>([]);
  const [selectedKycRequest, setSelectedKycRequest] =
    useState<KycDataWithUserData | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const fetchKycData = async () => {
    const { kycData } = await getKycDataAdmin();
    setKycData(kycData);
  };

  const handleDetailsModalOpen = (kycRequest: KycDataWithUserData) => {
    setSelectedKycRequest(kycRequest);
    setModalOpen(true);
  };
  useEffect(() => {
    fetchKycData();
  }, []);

  return (
    <>
      {kycData && kycData.length > 0 ? (
        kycData.map((kyc) => <KycRequestCard kycRequest={kyc} key={kyc._id} handleDetailsModalOpen={handleDetailsModalOpen}/>)
      ) : (
        <div>no Requests</div>
      )}
      <KycDetailsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        kycRequest={selectedKycRequest}
      />
    </>
  );
}

export default KycRequests;
