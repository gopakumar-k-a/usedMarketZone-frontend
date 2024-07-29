import AdminDashboardLayout from "@/components/admin/adminDashboard/AdminDashboardLayout";
import PageHeading from "@/components/admin/PageHeading";

import { RiDashboard2Fill } from "react-icons/ri";

function AdminDashboardPage() {
  return (
    <>
      <PageHeading heading={"Admin DashBoard"} Icon={RiDashboard2Fill} />
      <AdminDashboardLayout />
    </>
  );
}

export default AdminDashboardPage;
