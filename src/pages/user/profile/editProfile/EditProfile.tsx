import React, { useState, useEffect, useCallback, useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../../../../components/loader/Loader";
import { useAppSelector } from "../../../../utils/hooks/reduxHooks";
import useDebounce from "../../../../utils/hooks/useDebounce";
import { updateProfile, userNameAvailabilty } from "../../../../api/profile";
import { toast } from "react-toastify";
import { UserLoginResponse } from "@/types/login";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { updateUserCredentials } from "@/redux/reducers/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProfilePicSelector from "./ProfilePicSelector";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null); // Adjust type according to your userData structure
  const [userName, setUserName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState<boolean | null>(
    null
  );

  const checkUserName = useDebounce(async (userName: string) => {
    console.log("checking for user name ", userName);
    if (!userName) {
      setIsChecking(false); // Reset isChecking state
      setUserNameAvailable(null); // Reset userNameAvailable state
      return;
    }

    if (userData.userName != userName) {
      try {
        setIsChecking(true);

        const availability = await userNameAvailabilty(userName, userData?._id);
        console.log("availability ");

        setUserNameAvailable(availability);
        setIsChecking(false);
        console.log(
          `Username '${userName}' is ${availability ? "available" : "not available"}.`
        );
      } catch (error) {
        console.error("Error checking username availability:", error);
        setIsChecking(false);
      }
    }
  }, 3000);

  const handleUserNameChange = (event: any) => {
    const { value } = event.target;
    setUserName(value);

    setIsChecking(true);
    // Debounce the search callback
    checkUserName(value);
  };

  useEffect(() => {
    if (userData && userData.userName) {
      setUserName(userData.userName);
    }
  }, [userData]);

  // Fetch user data from Redux store or localStorage
  const userString = useAppSelector((state) => state.auth.user);
  // useEffect(() => {
  //   if (userString) {
  //     try {
  //       const userObj = JSON.parse(userString);
  //       console.log("User obj:", userObj);
  //       setUserData(userObj);
  //     } catch (e) {
  //       console.error("Failed to parse user data:", e);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [userString]);
  useEffect(() => {
    if (userString) {
      try {
        console.log("user string ", userString);

        const userObj = userString;
        console.log("User obj:", userObj);
        setUserData(userObj);
        setIsLoading(false);
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }, [userString]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    userName: Yup.string().required("user name is required"),
    phone: Yup.string().matches(/^\d+$/, "Phone must be a number"),
    bio: Yup.string(),
  });

  // Handle form submission
  const handleSubmit = async (values: any, { setSubmitting }) => {
    console.log("Form values:", values);
    values.userName = userName;
    // updateProfile(values).then((res) => {
    //   console.log("res in handle submit ", res);
    // });

    await toast
      .promise(
        updateProfile(values),
        {
          pending: "Updating Credentials",
          success: "User Profile Updated",
          error: "Failed to Update Please Check Credentials",
        },
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
      .then((response: any) => {
        console.log("response is ", response);
        const { updatedUser } = response;

        console.log("log in page   user, token, role", updatedUser);

        // dispatch(loginSuccess({ user: JSON.stringify(user), token }));

        dispatch(updateUserCredentials(updatedUser));
        navigate("/profile");

        //    else if (role == "admin") {
        //   dispatch(setCredentialsAdmin({ user, token, role }));
        //   navigate("/admin");
        // }
        // dispatch(authorizeUserOtpPage())
        // navigate('/otp', { state: { email: formData.email } });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // setLoading(false);
        setSubmitting(false);
      });
  };
  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] dark:text-gray-100 dark:bg-gray-900">
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                <Link to={"/profile"}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>{" "}
                Edit Profile
              </h2>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <div className="relative">
                    <img
                      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                      src={
                        userData?.imageUrl
                          ? userData?.imageUrl
                          : "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
                      }
                      alt="Bordered avatar"
                    />
                    <div className="absolute bottom-5 right-5 transform translate-x-1/2 translate-y-1/2">
                      <ProfilePicSelector />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 dark:bg-indigo-800 dark:border-gray-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-500"
                    >
                      Change Password
                    </button>
                    <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-500"
                    >
                      Delete picture
                    </button>
                  </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#202142] dark:text-gray-100">
                  <Formik
                    initialValues={{
                      firstName: userData?.firstName || "",
                      lastName: userData?.lastName || "",
                      userName: userData?.userName || "",
                      phone: userData?.phone !== 0 ? userData?.phone : "",
                      bio: userData?.bio || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="mb-2 sm:mb-6">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Email
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-500 dark:focus:border-gray-500 cursor-not-allowed"
                            placeholder="your.email@mail.com"
                            value={userData?.email}
                            readOnly
                            disabled
                          />
                        </div>
                        <div className="mb-2 sm:mb-6">
                          <label
                            htmlFor="userName"
                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Username
                          </label>
                          <Field
                            type="text"
                            name="userName"
                            id="userName"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            placeholder="Enter User Name"
                            value={userName}
                            onChange={handleUserNameChange}
                          />
                          {userName &&
                            (isChecking ? (
                              <div className="text-gray-600">
                                Checking availability...
                              </div> // Default text color
                            ) : userNameAvailable !== null ? (
                              <div
                                className={
                                  userNameAvailable
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                Username is{" "}
                                {userNameAvailable
                                  ? "available"
                                  : "not available"}
                              </div>
                            ) : null)}
                        </div>
                        <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                          <div className="w-full">
                            <label
                              htmlFor="firstName"
                              className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                            >
                              First name
                            </label>
                            <Field
                              type="text"
                              name="firstName"
                              id="firstName"
                              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-500 dark:focus:border-gray-500"
                              placeholder="Your first name"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="w-full">
                            <label
                              htmlFor="lastName"
                              className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                            >
                              Last name
                            </label>
                            <Field
                              type="text"
                              name="lastName"
                              id="lastName"
                              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-500 dark:focus:border-gray-500"
                              placeholder="Your last name"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>

                        <div className="mb-2 sm:mb-6">
                          <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Phone
                          </label>
                          <Field
                            type="text"
                            name="phone"
                            id="phone"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            placeholder="Your Phone Number"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="bio"
                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                          >
                            Bio
                          </label>
                          <Field
                            as="textarea"
                            name="bio"
                            id="bio"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            placeholder="Write your bio here..."
                          />
                          <ErrorMessage
                            name="bio"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex justify-end">
                          {/* <button
                            type="submit"
                            disabled={isSubmitting || isChecking}
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                          >
                            Save
                          </button> */}
                          <Button
                            type="submit"
                            disabled={isSubmitting || isChecking}
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                          >
                            save
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EditProfile;
