import { Badge } from "@/components/ui/badge";
import { KycDataWithUserData } from "@/types/user";
import { FaEye } from "react-icons/fa";
import { handleKycRequest } from "@/api/admin";
import { CustomAlertDialogue } from "@/components/alert/CustomAlertDialogue";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const KycRequestCard = ({
  kycRequest,
  handleDetailsModalOpen,
}: {
  kycRequest: KycDataWithUserData;
  handleDetailsModalOpen: (kycRequest: KycDataWithUserData) => void;
}) => {
  const {
    name,
    status,
    userDetails,
  } = kycRequest;

  const [isHandleKycDialogueOpen, setHandleKycDialogueOpen] = useState(false);
  const [dialogueTitle, setDialogueTitle] = useState("");
  const [dialogueDescription, setDialogueDescription] = useState("");
  const [currentStatus, setCurrentStatus] = useState<
    "accept" | "reject" | null
  >(null);
  const [adminActionStatus, setAdminActionStatus] = useState<
    "pending" | "accepted" | "rejected"
  >(status);

  const acceptTitle = "Accept KYC Request";
  const acceptDescription =
    "Are you sure you want to accept this KYC request? This action will verify the user's identity and cannot be undone.";

  const rejectTitle = "Reject KYC Request";
  const rejectDescription =
    "Are you sure you want to reject this KYC request? This action will mark the user's identity verification as rejected and cannot be undone.";

  const openDialogue = (status: "accept" | "reject") => {
    setDialogueTitle(status === "accept" ? acceptTitle : rejectTitle);
    setDialogueDescription(
      status === "accept" ? acceptDescription : rejectDescription
    );
    setCurrentStatus(status);
    setHandleKycDialogueOpen(true);
  };

  const handleContinue = async () => {
    if (currentStatus) {
      try {
        const { kycData } = await handleKycRequest(
          kycRequest._id,
          currentStatus
        );
        if (kycData) {
          setAdminActionStatus(kycData.status);
        }
        setHandleKycDialogueOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center">
        <img
          src={`${userDetails.imageUrl ? userDetails.imageUrl : ""}`}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm">First Name: {userDetails.firstName}</p>
          <p className="text-sm">Last Name: {userDetails.lastName}</p>
          <p className="text-sm">User Name: {userDetails.userName}</p>
        </div>
      </div>
      <div className="text-right">
        <div>
          <div
            onClick={() => handleDetailsModalOpen(kycRequest)}
            className="hover:bg-blue-600 w-8 h-8 bg-blue-500 flex items-center justify-center rounded-lg"
          >
            <FaEye className="text-white rounded-lg w-5 h-5" />
          </div>
          <div className="flex gap-2">
            <Badge
              className={`cursor-pointer mt-2 ${
                adminActionStatus === "accepted"
                  ? "bg-green-400 text-white"
                  : adminActionStatus === "rejected"
                    ? "bg-red-400 text-white"
                    : "bg-blue-400 text-white"
              }`}
            >
              {adminActionStatus === "accepted" && "Accepted"}
              {adminActionStatus === "rejected" && "Rejected"}
              {adminActionStatus === "pending" && "Pending"}
            </Badge>

            {adminActionStatus == "pending" && (
              <>
                <RxCross2
                  onClick={() => openDialogue("reject")}
                  className="w-12 h-10  bg-red-500 hover:bg-red-600 rounded-lg "
                />
                <TiTick
                  onClick={() => openDialogue("accept")}
                  className="w-12 h-10 bg-green-500 hover:bg-green-600 rounded-lg "
                />
              </>
            )}
          </div>
        </div>
      </div>
      <CustomAlertDialogue
        isOpen={isHandleKycDialogueOpen}
        onClose={() => setHandleKycDialogueOpen(false)}
        title={dialogueTitle}
        description={dialogueDescription}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default KycRequestCard;
