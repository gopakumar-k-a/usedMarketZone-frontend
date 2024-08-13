import { useEffect, useState } from "react";
import KycRequestCard from "./KycRequestCard";
import { getKycDataAdmin } from "@/api/admin";
import { KycDataWithUserData } from "@/types/user";
import KycDetailsModal from "./KycDetailsModal";
import { useSearchParams } from "react-router-dom";
import { DebouncedSearchInput } from "@/components/debounceSearch/DebouncedSearchInput";
import { SortDropdown } from "@/components/sort/SortDropDown";
import { Pagination } from "@/components/pagination/Pagination";

function KycRequests() {
  const [kycData, setKycData] = useState<KycDataWithUserData[]>([]);
  const [selectedKycRequest, setSelectedKycRequest] =
    useState<KycDataWithUserData | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [searchParams] = useSearchParams();
  const limit = 5;
  const fetchKycData = async (
    page: number = 1,
    search: string | null = "",
    sort: string | null
  ) => {
    const { kycData, totalDocuments } = await getKycDataAdmin(
      page,
      search,
      sort,
      limit
    );
    setKycData(kycData);
    setTotalDocuments(totalDocuments);
  };

  const handleDetailsModalOpen = (kycRequest: KycDataWithUserData) => {
    setSelectedKycRequest(kycRequest);
    setModalOpen(true);
  };
  useEffect(() => {
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : 1;
    const search = searchParams.get("search") ? searchParams.get("search") : "";
    const sort = searchParams.get("sort") ? searchParams.get("sort") : "";
    fetchKycData(page, search, sort);
  }, [searchParams]);

  const options = [
    { value: "createdAt_desc", label: "Newest" },
    { value: "createdAt_asc", label: "Oldest" },
  ];

  return (
    <>
      <div className="flex gap-2">
        <DebouncedSearchInput />
        <SortDropdown options={options} />
      </div>
      {kycData && kycData.length > 0 ? (
        kycData.map((kyc) => (
          <div className="pb-2">
            <KycRequestCard
              kycRequest={kyc}
              key={kyc._id}
              handleDetailsModalOpen={handleDetailsModalOpen}
            />
          </div>
        ))
      ) : (
        <div>no Requests</div>
      )}
      {kycData && kycData.length > 0 && (
        <Pagination pageSize={limit} totalCount={totalDocuments} />
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
