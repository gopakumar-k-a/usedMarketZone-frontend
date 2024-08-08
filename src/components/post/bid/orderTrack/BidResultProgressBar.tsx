import React, { useEffect, useState } from "react";
import { RiTimerFlashLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

function BidResultProgressBar({
  currentStep,
  role = "forSeller",
}: {
  currentStep:
    | "not_shipped"
    | "shipped_to_admin"
    | "received_by_admin"
    | "shipped_to_buyer"
    | "delivered";
  role: "forSeller" | "forWinner";
}) {
  const sellerSteps = [
    { status: "shipped_to_admin", label: "You Shipped Product to Admin" },
    { status: "received_by_admin", label: "Product is Received by Admin" },
    { status: "shipped_to_buyer", label: "Shipped to Buyer" },
    { status: "delivered", label: "Product Delivered to Buyer & Payment Received" },
  ];

  const winnerSteps = [
    { status: "shipped_to_admin", label: "Seller Shipped Product to Admin" },
    { status: "received_by_admin", label: "Product Received by Admin" },
    { status: "shipped_to_buyer", label: "Admin Shipped Product to You" },
    { status: "delivered", label: "Delivered Product To You" },
  ];

  const steps = role === "forSeller" ? sellerSteps : winnerSteps;

  const currentStepIndex = steps.findIndex(
    (step) => step.status === currentStep
  );
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    steps.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, index]);
      }, index * 700);
    });
  }, [steps]);

  const getStepClasses = (stepIndex: number) => {
    if (visibleSteps.includes(stepIndex)) {
      return stepIndex <= currentStepIndex ? "bg-indigo-700" : "bg-gray-200";
    }
    return "bg-gray-200";
  };

  return (
    <div className={`flex flex-col items-center w-1/6 mx-auto`}>
      {steps.map((step, index) => (
        <div
          key={step.status}
          className={`flex flex-col items-center mb-4 relative ${
            visibleSteps.includes(index) ? "opacity-100" : "opacity-50"
          }`}
        >
          <div
            className={`h-10 w-10 rounded-full shadow flex items-center justify-center ${getStepClasses(index)}`}
          >
            {index <= currentStepIndex ? (
              <FaCheck className="text-white" />
            ) : (
              <RiTimerFlashLine className="text-white" />
            )}
          </div>
          <p className="text-indigo-700 text-xs font-bold mt-2">
            Step {index + 1}: {step.label}
          </p>
          {index < steps.length - 1 && (
            <div className={`w-1 h-16 ${getStepClasses(index + 1)}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default BidResultProgressBar;
