import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers,  } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { ForgotPassword } from "../../types/login";
import { forgotPassword } from "../../api/auth";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { ForgotPasswordResponse } from "../../types/login";
import GoogleButton from "./GoogleButton";

function ForgotPass() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);


  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const onSubmit = async (
    values: ForgotPassword,
    { setSubmitting }: FormikHelpers<ForgotPassword>
    // : FormikHelpers<UserLogin>
  ) => {
    console.log("Form data", values);
    alert(`values ${values}`);
    await toast
      .promise(
        forgotPassword(values),
        {
          pending: "Checking Credentials",
          success: "Otp send Successfully",
    
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
      .then((response: ForgotPasswordResponse) => {
        console.log("response is ", response);
        localStorage.setItem("otpToken",response.otpToken);
        localStorage.setItem("verifyingEmail",values.email)
        localStorage.setItem("purpose","forgotPassword")
        navigate("/otp", {
          state: {
            email: values.email,
            purpose: "forgotPassword",
            otpToken: response.otpToken,
          },
        });
      
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
           <section className="flex items-center justify-center ">
           <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md  bg-white rounded-lg">
          <h2 className="text-left text-2xl font-bold leading-tight text-black">
            Forgot Password
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
                  {/* <div className="relative">
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
                  </div> */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-base font-medium text-gray-900">
                        <p className="text-sm font-semibold text-black">
                          Already Have an Account?
                        </p>
                      </label>
                      <Link
                        to="/login"
                        className="text-sm font-semibold text-blue-500 hover:underline"
                      >
                        Log In
                      </Link>
                    </div>
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
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center rounded-md bg-customOrange px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-customOrange/90"
                      >
                        Get Otp
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <GoogleButton />
        </div>
      </section>
      {isLoading && <Loader />}
    </>
  );
}

export default ForgotPass;
