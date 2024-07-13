import PageHeading from "@/components/admin/PageHeading";
import React from "react";
import { BsPostcardFill } from "react-icons/bs";

function PostManagementPage() {
  return (
    <>
        <PageHeading heading={"Post Management"} Icon={BsPostcardFill}/>
      <div className="bg-red-600">
        <h1>this is post management page</h1>
      </div>
    </>
  );
}

export default PostManagementPage;
