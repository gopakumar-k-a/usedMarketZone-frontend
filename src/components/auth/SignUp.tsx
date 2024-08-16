import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../loader/Loader";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { userOtpSignUp } from "../../api/auth";
import { toast } from "react-toastify";
import { authorizeUserOtpPage } from "../../redux/reducers/user/auth/otpProtect/otpProtectSlice";
export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const initialValues: SignUpFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/^(?=.*[A-Z])/, "Password must start with an uppercase letter")
      .matches(
        /(?=.*[@#$%^&*(),.?":{}|<>])/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
    
  });

  const onSubmit = async (values: SignUpFormValues,  { setSubmitting }: FormikHelpers<SignUpFormValues>) => {
    const { confirmPassword, ...formData } = values;

    setLoading(true);

    await toast
      .promise(
        userOtpSignUp(formData),
        {
          pending: "Sending Otp",
          success: "Successfully sent OTP To Your Account",
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
      .then((response) => {
        dispatch(authorizeUserOtpPage());

        localStorage.setItem("userData", JSON.stringify(response.userData));

        localStorage.setItem("verifyingEmail", values.email);
        localStorage.setItem("purpose", "register");
        navigate("/otp", {
          state: { email: formData.email, purpose: "register" },
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setSubmitting(false);
      });
  };



  return (
    <>
          <section className="flex items-center justify-center ">
          <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md  bg-white rounded-lg">
          <h2 className="text-left text-2xl font-bold leading-tight text-black">
            Sign Up
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
                        First Name
                      </p>
                    </label>
                    <div className="mt-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="h-5 w-5 text-gray-400"
                          />
                        </div>
                        <Field
                          name="firstName"
                          placeholder="First Name"
                          type="text"
                          className="pl-8 pr-3 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="absolute text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <label className="text-base font-medium text-gray-900">
                      <p className="text-left text-sm font-semibold text-black">
                        Last Name
                      </p>
                    </label>
                    <div className="mt-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="h-5 w-5 text-gray-400"
                          />
                        </div>
                        <Field
                          name="lastName"
                          placeholder="Last Name"
                          type="text"
                          className="pl-8 pr-3 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="absolute text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
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
                    <label className="text-base font-medium text-gray-900">
                      <p className="text-left text-sm font-semibold text-black">
                        Phone
                      </p>
                    </label>
                    <div className="mt-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FontAwesomeIcon
                            icon={faPhone}
                            className="h-5 w-5 text-gray-400"
                          />
                        </div>
                        <Field
                          name="phone"
                          placeholder="Phone"
                          type="number"
                          className="pl-8 pr-3 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <ErrorMessage
                          name="phone"
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
                  <div className="relative">
                    <p className="text-left text-sm font-semibold text-black">
                      Confirm Password
                    </p>
                    <div className="relative mt-2">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="h-5 w-5 text-gray-400"
                        />
                      </div>
                      <Field
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type={confirmPasswordVisible ? "text" : "password"}
                        className="pl-8 pr-3 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {confirmPasswordVisible ? (
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
                        name="confirmPassword"
                        component="div"
                        className="absolute text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
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
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-3 space-y-3">
            <button
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              type="button"
            >
              <span className="mr-2 inline-block">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-rose-500"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </section>

      {isLoading && <Loader />}
    </>
  );
}

export default SignUp;
