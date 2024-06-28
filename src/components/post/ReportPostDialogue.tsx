import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import reportReasons from "@/constants/postReportReasons";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
export interface ReportPost {
  reason?: string;
  reasonType?: string;
  postId?: string;
}
import { postReport } from "@/api/product";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
export function ReportPostDialogue({ isOpen, onClose, postId }) {
  const submitReport = async (formData: ReportPost, id = postId) => {
    console.log("post id inside submitReport ", id);
    console.log("problem data ", formData);
    formData.postId = id;
    console.log("problem data after adding post id", formData);
    // try {
    //     const response = await postReport(formData);
    //     console.log("response in postReport ui ", response);
    //     toast.success("Report submitted successfully!");
    //   } catch (error) {
    //     console.error("Error in postReport ui", error.message);
    //     toast.error(`Failed to submit report: ${error.message}`);
    //   } finally {
    //     onClose();
    //   }
    await postReport(formData)
      .then((response) => {
        console.log("response in postReport ui ", response);
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          console.error("Error in postReport ui", error);
          const message = error.response?.data?.message;
          toast.error(`Failed to submit report: ${message}`);
        } else {
          toast.error("Failed to submit report: Something went wrong!");
        }
      })
      .finally(() => {
        onClose();
      });
  };
  useEffect(() => {
    console.log("post id is ", postId);
  }, []);
  const formik = useFormik({
    initialValues: {
      reason: "",
      reasonType: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string().required("Problem description is required").min(10),
      reasonType: Yup.string().required("Please Select Type of Reason"),
    }),
    onSubmit: (reason) => submitReport(reason),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Post</DialogTitle>
          <DialogDescription>
            Select the type of Report and Type The Reason
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 py-4">
            <Select
              name="reasonType"
              onValueChange={(value) => {
                formik.setFieldValue("reasonType", value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Reason</SelectLabel>
                  {Object.entries(reportReasons).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.reasonType && formik.errors.reasonType ? (
              <div className="text-red-500">{formik.errors.reasonType}</div>
            ) : null}
            <Textarea
              name="reason"
              placeholder="Type your problem here."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reason}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Report</Button>
          </DialogFooter>
        </form>
        {formik.touched.reason && formik.errors.reason ? (
          <div className="text-red-500">{formik.errors.reason}</div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
