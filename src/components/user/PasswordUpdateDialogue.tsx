"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "../loader/Loader";
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
import { Input } from "@/components/ui/input";
import { updateUserPassword } from "@/api/profile";

const PasswordUpdateDialogue = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    // const { currentPassword, newPassword, confirmPassword } = req.body;
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log("Form values", values);
    // Handle password update logic here4
    setSubmitting(true);

    // const { newPassword, email } = values;
    // console.log("email is ", email);
    // email ? (email = email) : localStorage.getItem("verifyingEmail");
    try {
      await toast
        .promise(
          updateUserPassword(values),
          {
            pending: "Resetting password...",
            success: "Password reset successful!",
            error: "Failed to reset password. Please Check Your Current Password",
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
            toast.success(response.message)
          console.log("response in update user password ", response);
          onClose()
        });
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
                <Label htmlFor="new_password">Current Password</Label>
                <Field
                  name="currentPassword"
                  as={PasswordInput}
                  id="current_password"
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-red-600"
                />
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

export default PasswordUpdateDialogue;
