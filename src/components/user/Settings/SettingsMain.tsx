import KycComp from "../kyc/KycComp";

function SettingsMain() {
  return (
    <>
      <div className="flex justify-center bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-3xl w-full mx-auto p-6 bg-white text-black rounded-md shadow-md dark:bg-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>
          <div className="flex justify-center">
            <div className="flex-col w-4/5 h-full pt-4">
              <KycComp/>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default SettingsMain;
