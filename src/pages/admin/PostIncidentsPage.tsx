import PageHeading from "@/components/admin/PageHeading";
import { useEffect, useState } from "react";
import { MdReport } from "react-icons/md";
import { getPostReports } from "@/api/admin";
import { PostReport } from "@/types/admin/postReport";
import PostReportCard from "@/components/admin/postIncidents/PostReportCard";
function PostIncidentsPage() {
  const [reports, setReports] = useState<PostReport[]>([]);
  const fetchPostReports = async () => {
    const reports = await getPostReports();
    console.log("reports ", reports);

    setReports(reports.postReports);
  };

  useEffect(() => {
    fetchPostReports();
  }, []);
  return (
    <>
      <PageHeading heading={"Post Incidents"} Icon={MdReport} />
      {reports && reports.length > 0 ? (
        <>
          {reports.map((report: PostReport) => (
        <PostReportCard report={report}/>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default PostIncidentsPage;
