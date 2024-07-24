import { ImHammer2 } from "react-icons/im";
function OutBidNotification() {
  return (
    <>
      <div className="sm:w-8/12 p-3 mt-4 bg-white rounded flex">
        <div
          aria-label="post icon"
          role="img"
          className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
        >
          <ImHammer2 className="text-red-600" />
        </div>
        <div className="pl-3">
          <p className="focus:outline-none text-sm leading-none">
            <span className="text-indigo-700">user name</span>  out-bidded You 
          </p> <span className="text-indigo-700">on product</span>
          <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
            2 hours ago
          </p>
        </div>
      </div>
    </>
  );
}

export default OutBidNotification;
