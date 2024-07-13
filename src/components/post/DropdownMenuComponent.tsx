import React, { useState, useEffect, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdReportProblem } from "react-icons/md";
import { ReportPostDialogue } from "./ReportPostDialogue";
import { store } from "@/redux/app/store";
import { FaEyeSlash } from "react-icons/fa";
const DropdownMenuComponent = ({
  postId,
  ownerId,
}: {
  postId: string;
  ownerId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReportModalOpen, setIsModalOpen] = useState(false);
  const myUserId = store.getState().auth.user?._id;
  //   const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
  //       // Check if clicked element is **inside** the dropdown
  //       return; // If clicked inside, do nothing
  //     }
  //     setIsOpen(false); // If clicked outside, close the dropdown
  //   };

  const handleReportModalOpen = () => {
    setIsModalOpen(true);
    setIsOpen(!isOpen);
  };
  const closeReportModal = () => {
    setIsModalOpen(false);
  };

  //   useEffect(() => {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);
  return (
    <>
      <div className="relative inline-block text-left w-full ">
        <div className="flex justify-end">
          <BsThreeDots
            onClick={toggleDropdown}
            className="cursor-pointer w-5 h-5"
          />
        </div>

        {isOpen && (
          <div
            id="dropdown"
            className="z-10 absolute left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <button
                  onClick={() => handleReportModalOpen()}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div className="flex items-center">
                    <MdReportProblem className="h-5 w-5 mr-2 text-red-500" />
                    <span className="text-red-500 font-bold">report post</span>
                  </div>
                </button>
              </li>
              {myUserId && myUserId == ownerId && (
                <li>
                  <button
                    // onClick={() => handleReportModalOpen()}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <div className="flex items-center">
                      <FaEyeSlash className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-red-500 font-bold">
                        DeActivate post
                      </span>
                    </div>
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {isReportModalOpen && (
        <ReportPostDialogue
          isOpen={isReportModalOpen}
          onClose={closeReportModal}
          postId={postId}
        />
      )}
    </>
  );
};

export default DropdownMenuComponent;
