import { faBookmark, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { User } from "@/types/login";
import { Link } from "react-router-dom";
function ProfileTop({ userData, ownerProfile }) {
  return (
    <>
      <div className=" w-full bg-red-200 dark:bg-gray-800 flex justify-center items-center">
        <div className="container w-full bg-white shadow-lg transform duration-200 ease-in-out">
          <div className="h-32 overflow-hidden">
            <img
              className="w-full"
              src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt=""
            />
          </div>
          {ownerProfile && (
            <div className="w-full h-20 flex sm:pt-10 pt-2 justify-end">
        
              <Link to={"/edit-profile"}>
                <button
                  type="button"
                  className="py-2 px-3 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 dark:bg-indigo-800 dark:text-indigo-100 dark:border-gray-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-500"
                >
                  Edit Profile
                </button>
              </Link>
  
            </div>
          )}

          <div className="flex justify-center px-5 -mt-12">
            <img
              className="h-32 w-32 bg-white rounded-full"
              src={
                userData?.imageUrl
                  ? userData?.imageUrl
                  : "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
              }
              alt=""
            />
          </div>
          <div className="text-center px-14 mt-4">
            <h2 className="text-gray-800 text-3xl font-bold">
              {userData?.firstName} {userData?.lastName}
            </h2>
            <a
              className="text-gray-400 mt-2 hover:text-blue-500"
              href="https://www.instagram.com/immohitdhiman/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{userData?.userName}
            </a>
            <p className="mt-2 text-gray-500 text-sm">{userData?.bio}</p>
          </div>

          {ownerProfile && (
            <div className="flex justify-center gap-4 mt-4">
              <div className="bg-white dark:bg-gray-900 flex justify-center">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-purple-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                  type="button"
                >
                  <FontAwesomeIcon icon={faBookmark} />
                  Bookmarks
                </button>
              </div>

              <div className="bg-white dark:bg-gray-900 flex justify-center">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-green-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                  type="button"
                >
                  <FontAwesomeIcon icon={faWallet} />
                  Wallet
                </button>
              </div>
            </div>
          )}

          <hr className="mt-6" />

          <div className="flex border-t border-b">
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-semibold">2.5k </span> Followers
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-semibold">2.0k </span> Following
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileTop;
