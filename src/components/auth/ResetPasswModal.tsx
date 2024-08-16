"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { submitNewPass } from "@/api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
interface FormValues {
  newPassword: string;
  confirmPassword: string;
  email: string;
}
const ResetPassModal = ({
  isOpen,
  onClose,
  email,
}: {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), "undefined"], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
    email,
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>
  ) => {
    console.log("Form values", values);
    // Handle password update logic here4

    const { newPassword, email } = values;
    console.log("email is ", email);
    // email ? (email = email) : localStorage.getItem("verifyingEmail");
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
      navigate("/login", { state: { email } });
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>

          <DialogDescription>
            Reset Password By Adding new Password
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid gap-4 py-4">
                <Label htmlFor="new_password">New Password</Label>
                <Field
                  name="newPassword"
                  as={PasswordInput}
                  id="new_password"
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-600"
                />

                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Field
                  name="confirmPassword"
                  as={PasswordInput}
                  id="confirm_password"
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  Save changes
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassModal;
