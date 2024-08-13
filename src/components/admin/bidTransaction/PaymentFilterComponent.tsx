import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentFilterComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handlePaymentStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    searchParams.set("paymentStatus", e.target.value);
    setSearchParams(searchParams);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-end dark:text-white ">
        <span className="border-l border-gray-500 h-6 mr-2"></span>
        <p>payment Status</p>
      </div>

      <select
        onChange={handlePaymentStatusChange}
        className="ml-2 mt-1 text-gray-500 border-2 rounded-md px-4 py-1.5 duration-200 focus:border-primary-50"
        value={searchParams.get("paymentStatus") || ""}
      >
        {/* "captured", "failed", "escrow", "released" */}
        <option value="">All</option>
        <option value="captured">captured</option>
        <option value="failed">failed</option>
        <option value="escrow">escrow</option>
        <option value="released">released</option>
      </select>
    </div>
  );
};

export default PaymentFilterComponent;
