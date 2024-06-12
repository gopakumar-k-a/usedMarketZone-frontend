import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../utils/hooks/reduxHooks";
import { Link } from "react-router-dom";

function ProfilePage() {

  // console.log('user is user',JSON.parse(user));

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const userObj = JSON.parse(userString);

        console.log("user obj ", userObj);

        setUserData(userObj);
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }, []);

  return (
    <div
      className={`w-full h-screen flex justify-center bg-white dark:bg-gray-900`}
    >
      <div className="h-full w-10/12 bg-white dark:bg-gray-900">
        {/* top section */}
        <div className="grid grid-cols-12 h-2/6 bg-white dark:bg-gray-900 mt-7">
          <div className="w-full border-2 border-gray-400 aspect-square mt-4 col-span-4 rounded-full bg-white dark:bg-gray-900 overflow-hidden">
            {/* profile picture part */}
            <img
              src={`${userData?.imageUrl ? userData?.imageUrl : "/UMZ-logo.svg"}`}
              alt="Profile Picture"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* user info part */}
          <div className="col-span-8 bg-white ml-2 dark:bg-gray-900 grid grid-cols-12 grid-rows-12">
            <div className="col-span-6 row-span-3 bg-white dark:bg-gray-900">
              {/* username */}
              <h1 className="text-gray-800 dark:text-white font-semibold text-xl">
                {userData?.userName}
              </h1>
            </div>
            <div className="col-span-6 row-span-3 bg-white dark:bg-gray-900 flex justify-end items-end p-4">
              <Link to={"/edit-profile"}>
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 dark:bg-indigo-800 dark:text-indigo-100 dark:border-gray-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-500"
                >
                  Edit Profile
                </button>
              </Link>
            </div>

            <div className="col-span-4 row-span-2 bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
              {/* no of posts */}
              <h1 className="font-bold text-xl text-gray-800 dark:text-white">
                200
              </h1>
              <h1 className="font-medium text-lg text-gray-800 dark:text-white">
                posts
              </h1>
            </div>

            <div className="col-span-4 row-span-2 bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
              {/* following */}
              <h1 className="font-bold text-xl text-gray-800 dark:text-white">
                200
              </h1>
              <h1 className="font-medium text-lg text-gray-800 dark:text-white">
                following
              </h1>
            </div>

            <div className="col-span-4 row-span-2 bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
              {/* followers */}
              <h1 className="font-bold text-xl text-gray-800 dark:text-white">
                200
              </h1>
              <h1 className="font-medium text-lg text-gray-800 dark:text-white">
                followers
              </h1>
            </div>

            <div className="col-span-12 row-span-2 bg-white dark:bg-gray-900">
              {/* name */}

              <h1 className="text-gray-800 dark:text-white font-semibold text-lg">
                {userData?.firstName} {userData?.lastName}
              </h1>
            </div>
            <div className="col-span-12 row-span-6 bg-white dark:bg-gray-900">
              {/* bio */}
              <h1 className="text-gray-800 dark:text-white font-medium text-lg">
                bio
              </h1>
              <h1 className="text-gray-800 dark:text-white font-medium text-lg">
                {userData?.bio}
              </h1>
            </div>

            {/* responsive part */}
          </div>

          <div className="col-span-6 bg-white dark:bg-gray-900 flex justify-center">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-purple-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
              type="button"
            >
              <FontAwesomeIcon icon={faBookmark} />
              Bookmarks
            </button>
          </div>

          <div className="col-span-6 bg-white dark:bg-gray-900 flex justify-center">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-green-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
              type="button"
            >
              <FontAwesomeIcon icon={faWallet} />
              Wallet
            </button>
          </div>

          <div className="sm:hidden block col-span-4 bg-white dark:bg-gray-900">
            <h1 className="text-gray-800 dark:text-white">mobile view posts</h1>
          </div>
          <div className="sm:hidden block col-span-4 bg-white dark:bg-gray-900">
            <h1 className="text-gray-800 dark:text-white">
              mobile view followers
            </h1>
          </div>
          <div className="sm:hidden block col-span-4 bg-white dark:bg-gray-900">
            <h1 className="text-gray-800 dark:text-white">
              mobile view following
            </h1>
          </div>

          <div className=" border-t-2 border-b-2 border-gray-400 col-span-6 mt-2 flex items-center justify-center bg-white dark:bg-gray-900">
            {/* posts */}
            <h1 className="text-gray-800 dark:text-white font-medium text-lg ">
              posts
            </h1>
          </div>
          <div className=" border-t-2 border-b-2 border-gray-400 col-span-6 mt-2 flex items-center justify-center bg-white dark:bg-gray-900">
            {/* tagged */}
            <h1 className="text-gray-800 dark:text-white  font-medium text-lg">
              tagged
            </h1>
          </div>

          <div className="col-span-12 mt-2 flex items-center justify-center bg-white dark:bg-gray-900">
            {/* posts */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>

              <div className="col-span-1 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image 1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
