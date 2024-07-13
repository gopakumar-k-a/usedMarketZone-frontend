import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdBlock } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

// import { PostReport } from '@/types/admin/admin';
import { PostReport } from "@/types/admin/postReport";
import useBlockPost from "@/utils/hooks/admin/useBlockPost";
import { CustomAlertDialogue } from "@/components/alert/CustomAlertDialogue";
import { useNavigate } from "react-router-dom";
interface ReportProps {
  report: PostReport;
  //   handleAccept: (reportId: string) => void;
  //   handleReject: (reportId: string) => void;
}
// isOpen, onClose, title, description,onContinue
const PostReportCard: React.FC<ReportProps> = ({ report }) => {
  const [isBlockAlertOpen, setBlockAlertOpen] = useState(false);
  //   const [isHovered, setIsHovered] = useState(false);

  const handleCloseBlockAlert = () => {
    setBlockAlertOpen(false);
  };
  // <CustomAlertDialogue isOpen={isBlockAlertOpen} onClose={handleCloseBlockAlert} title={title} description={description} onContinue={()=>blockPost(report.post_id)}/>
  const navigate = useNavigate();
  const { blockPost, isBlocked } = useBlockPost(report.postIsBlocked);
  const title = `Do you want to ${isBlocked ? "un-block" : "block"} the post`;
  const description = `Clicking continue will ${isBlocked ? "un-block" : "block"} the post`;
  return (
    <>
    <div className="w-full flex justify-center">
      <div className="bg-gray-800 text-white shadow-lg border rounded-lg overflow-hidden w-9/10">
        <div className="flex">
          <div className="ml-2">
            <img
              src={report.postImageUrl[0]}
              alt="Reported post"
              className="w-24 h-24 object-contain"
            />
          </div>
          <div className="p-2 flex-grow">
            <div className="flex justify-between items-start">
              <div className="text-sm">
                <h5 className="font-bold text-xl">{report.reasonType}</h5>
                <p>Reason: {report.reason}</p>
                {/* navigate("/admin/user-profile",{state:{userId:user._id}}) */}

                <p>
                  Reported by:{" "}
                  <span
                    className="hover:underline cursor-pointer"
                    onClick={() =>
                      navigate("/admin/user-profile", {
                        state: { userId: report.reporterId },
                      })
                    }
                  >
                    {report.reporterName}
                  </span>
                </p>
                <p>
                  Post Owner:{" "}
                  <span
                    className="hover:underline cursor-pointer"
                    onClick={() =>
                      navigate("/admin/user-profile", {
                        state: { userId: report.postOwnerId },
                      })
                    }
                  >
                    {report.postOwnerName}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-white-500">
                  Action Taken: {report.actionTaken ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-start items-center gap-2">
            {!report.actionTaken ? (
              <>
                {!isBlocked ? (
                  <>
                    <span>
                      <Badge variant="secondary" className="text-white bg-green-400">active</Badge>
                    </span>{" "}
                    <MdBlock
                      onClick={() => setBlockAlertOpen(true)}
                      className="w-12 h-10 bg-red-600 hover:bg-red-500 rounded-lg cursor-pointer"
                    />
                  </>
                ) : (
                  <>
                    <span>
                      {" "}
                      <Badge variant="destructive">blocked</Badge>
                    </span>
                    <RxCross2
                      onClick={() => setBlockAlertOpen(true)}
                      className="w-12 h-10 bg-red-600 hover:bg-red-500 rounded-lg cursor-pointer"
                    />
                  </>
                )}
              </>
            ) : (
              <h1>Accepted</h1>
            )}
          </div>
        </div>
      </div>
      </div>
      {
        <CustomAlertDialogue
          isOpen={isBlockAlertOpen}
          onClose={handleCloseBlockAlert}
          title={title}
          description={description}
          onContinue={() => blockPost(report.postId)}
        />
      }
    </>
  );
};

export default PostReportCard;
