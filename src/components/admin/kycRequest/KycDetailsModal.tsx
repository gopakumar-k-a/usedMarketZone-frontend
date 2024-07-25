import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { KycDataWithUserData } from "@/types/user";

const KycDetailsModal = ({
  isOpen,
  onClose,
  kycRequest,
}: {
  isOpen: boolean;
  onClose: () => void;
  kycRequest: KycDataWithUserData | null;
}) => {
  if (!kycRequest) return null;

  const {
    name,
    dob,
    idType,
    idNumber,
    phone,
    status,
    createdAt,
    isAdminAccepted,
    userDetails
  } = kycRequest;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>KYC Request Details</DialogTitle>
        <DialogDescription>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>first name:</strong> {userDetails.firstName}
            </p>
            <p>
              <strong>last name:</strong> {userDetails.lastName}
            </p>
            <p>
              <strong>user name:</strong> {userDetails.userName}
            </p>
            <p>
              <strong>DOB:</strong> {new Date(dob).toLocaleDateString()}
            </p>
            <p>
              <strong>ID Type:</strong> {idType}
            </p>
            <p>
              <strong>ID Number:</strong> {idNumber}
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
            <p>
              <strong>Requested Time:</strong>{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Admin Status:</strong>{" "}
              {isAdminAccepted ? "Accepted" : "Pending"}
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <Badge
              className="cursor-pointer bg-blue-400 text-white"
              onClick={onClose}
            >
              Close
            </Badge>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default KycDetailsModal;
