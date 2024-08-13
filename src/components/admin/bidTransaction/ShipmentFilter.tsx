import { useNavigate, useSearchParams } from "react-router-dom";

const ShipmentFilterComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleShipmentStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    searchParams.set("shipmentStatus", e.target.value);
    setSearchParams(searchParams);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-end dark:text-white ">
        <span className="border-l border-gray-500 h-6 mr-2"></span>
        <p>shipment Status</p>
      </div>

      <select
        onChange={handleShipmentStatusChange}
        className="ml-2 mt-1 text-gray-500 border-2 rounded-md px-4 py-1.5 duration-200 focus:border-primary-50"
        value={searchParams.get("shipmentStatus") || ""}
      >
        <option value="">All</option>
        <option value="not_shipped">Not Shipped</option>
        <option value="shipped_to_admin">Shipped to Admin</option>
        <option value="received_by_admin">Received by Admin</option>
        <option value="shipped_to_buyer">Shipped to Buyer</option>
        <option value="delivered">Delivered</option>
      </select>
    </div>
  );
};

export default ShipmentFilterComponent;
