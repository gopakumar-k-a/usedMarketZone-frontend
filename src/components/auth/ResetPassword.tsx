import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../loader/Loader";
import { submitNewPass } from "@/api/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otpToken } = location.state || {};

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter and one number"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    const { newPassword } = values;

    try {
      await toast.promise(
        submitNewPass({ email, newPassword }),
        {
          pending: "Resetting password...",
          success: "Password reset successful!",
          error: "Failed to reset password. Please try again.",
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
      );
      navigate("/login",{state:{email}});
    } catch (error) {
      console.error(error);
      setFieldError(
        "newPassword",
        "Failed to reset password. Please try again."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <h2 className="font-semibold text-base mb-2">Enter your new password</h2>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mb-4">
            <div className="mb-4">
              <Field
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="w-64 p-2 border rounded mb-2"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-600"
              />
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-64 p-2 border rounded"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-600"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-5 bg-green-700 text-white rounded hover:bg-green-800 mb-2"
              disabled={isSubmitting}
            >
              Reset Password
            </button>
            {isSubmitting && <Loader />}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
