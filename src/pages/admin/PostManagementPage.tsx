import PageHeading from "@/components/admin/PageHeading";
import PostManagementMain from "@/components/admin/postManagement/PostManagementMain";
import React from "react";
import { BsPostcardFill } from "react-icons/bs";

function PostManagementPage() {
  return (
    <>
      <PageHeading heading={"Post Management"} Icon={BsPostcardFill} />
      <PostManagementMain />
    </>
  );
}

export default PostManagementPage;
