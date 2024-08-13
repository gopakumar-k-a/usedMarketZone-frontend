import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { UserLogin } from "../../types/login";
import { userLoginAuthenticate } from "../../api/auth";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { setCredentials } from "../../redux/reducers/auth/authSlice";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { UserLoginResponse } from "../../types/login";
import { setCredentialsAdmin } from "../../redux/reducers/admin/auth/adminSlice";
import GoogleButton from "./GoogleButton";
import { motion } from "framer-motion";
function LogIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const location = useLocation();
  const emailAfterSignup = location.state?.email;
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const initialValues = {
    email: emailAfterSignup ? emailAfterSignup : "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (
    values: UserLogin,
    { setSubmitting }: FormikHelpers<UserLogin>
  ) => {
    console.log("Form data", values);
    await toast
      .promise(
        userLoginAuthenticate(values),
        {
          pending: "Checking Credentials",
          success: "Log In Success",
          error: {
            render({ data }) {
              // Extracting error message from response
              if (data.response && data.response.data) {
                return `Failed to LogIn: ${data.response.data.message}`;
              }
              return `Failed to LogIn: ${data.message}`;
            },
          },
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
      .then((response: UserLoginResponse) => {
        console.log("response is ", response);
        const { user, accessToken, role } = response;

        console.log("log in page   user, token, role", user);

        // dispatch(loginSuccess({ user: JSON.stringify(user), token }));

        dispatch(setCredentials({ user, accessToken, role }));
        console.log("user role UserLoginResponse ", user.role);

        if (user.role == "user") {
          console.log(`if (user.role == "user")`);

          navigate("/");
        } else if (user.role == "admin") {
          console.log(`else if (user.role == "admin")`);

          navigate("/admin");
        }

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
        setLoading(false);
        setSubmitting(false);
      });

    setSubmitting(false);
  };

  return (
    <>
      <motion.section
        className="flex items-center justify-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md  bg-white rounded-lg">
          <h2 className="text-left text-2xl font-bold leading-tight text-black">
            Log In
          </h2>
          <hr className="border-gray-300 my-6" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8">
                <div className="space-y-5">
                  <div className="relative">
                    <label className="text-base font-medium text-gray-900">
                      <p className="text-left text-sm font-semibold text-black">
                        Email
                      </p>
                    </label>
                    <div className="mt-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="h-5 w-5 text-gray-400"
                          />
                        </div>
                        <Field
                          name="email"
                          placeholder="Email"
                          type="email"
                          className="pl-8 pr-3 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="absolute text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <p className="text-left text-sm font-semibold text-black">
                      Password
                    </p>
                    <div className="relative mt-2">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="h-5 w-5 text-gray-400"
                        />
                      </div>
                      <Field
                        name="password"
                        placeholder="Password"
                        type={passwordVisible ? "text" : "password"}
                        className="pl-8 pr-3 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {passwordVisible ? (
                          <FontAwesomeIcon
                            icon={faEye}
                            className="h-5 w-5 text-gray-500"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="h-5 w-5 text-gray-500"
                          />
                        )}
                      </button>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-base font-medium text-gray-900">
                        <p className="text-sm font-semibold text-black">
                          Don't Have an Account?
                        </p>
                      </label>
                      <Link
                        to="/signup"
                        className="text-sm font-semibold text-blue-500 hover:underline"
                      >
                        Create Account
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-base font-medium text-gray-900">
                        <p className="text-sm font-semibold text-black">
                          Forgot Password?
                        </p>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-semibold text-blue-500 hover:underline"
                      >
                        Forgot Password
                      </Link>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center rounded-md bg-customOrange px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-customOrange/90"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <GoogleButton />
        </div>
      </motion.section>
      {isLoading && <Loader />}
    </>
  );
}

export default LogIn;
