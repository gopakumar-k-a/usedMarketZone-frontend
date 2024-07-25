import { MdLockPerson } from "react-icons/md";
import PageHeading from "../PageHeading";
import KycRequests from "./KycRequests";
function KycRequestMain() {
  return (
    <>
      <PageHeading heading={"KYC Requests"} Icon={MdLockPerson} />
      <KycRequests />
    </>
  );
}

export default KycRequestMain;
