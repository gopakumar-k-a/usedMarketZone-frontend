import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import KycDialogue from "./KycDialogue";
function SettingsMain() {
  const [isKycDialogueOpen, setKycDialogueOpen] = useState(false);
  return (
    <>
      <div className="flex justify-center bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-3xl w-full mx-auto p-6 bg-white text-black rounded-md shadow-md dark:bg-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>
          <div className="flex justify-center">
            <div className="flex-col w-4/5 h-full pt-4">
              <div className="flex justify-around">
                <h1 className="text-xl font-semibold mb-6 ">Get Verified </h1>
                <span onClick={() => setKycDialogueOpen(true)}>
                  <Badge className="cursor-pointer bg-blue-400 text-white">
                    complete KYC
                  </Badge>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isKycDialogueOpen && <KycDialogue  isKycDialogueOpen={isKycDialogueOpen} setKycDialogueOpen={setKycDialogueOpen} />}
    </>
  );
}

export default SettingsMain;
