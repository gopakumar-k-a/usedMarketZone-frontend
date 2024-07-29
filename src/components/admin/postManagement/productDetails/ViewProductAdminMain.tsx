import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ViewProductAdminMain() {
  const [prId, setPrId] = useState("");
  const location = useLocation();
  const { productId } = location.state;
  useEffect(() => {
    setPrId(productId);
  }, []);
  return (
    <>
      <h1>ViewProductAdminMain prId:{prId}</h1>
    </>
  );
}

export default ViewProductAdminMain;
