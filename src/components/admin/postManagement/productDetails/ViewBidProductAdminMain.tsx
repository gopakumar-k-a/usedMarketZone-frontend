import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function ViewBidProductAdminMain() {
  const [prId, setPrId] = useState("");
  const location = useLocation();
  const { productId } = location.state;
  useEffect(() => {
    setPrId(productId);
  }, []);

  return (
    <>
      <h1>view bid Product Main prId:{prId}</h1>
    </>
  );
}

export default ViewBidProductAdminMain;
