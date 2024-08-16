import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { submitKycRequest } from "@/api/user";
import { toast } from "react-toastify";

interface KycProps {
  isKycDialogueOpen: boolean;
  setKycDialogueOpen: (isOpen: boolean) => void;
}

const KycDialogue: React.FC<KycProps> = ({
  isKycDialogueOpen,
  setKycDialogueOpen,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    return eighteenYearsAgo;
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    dob: Yup.date()
      .required("Date of Birth is required")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be at least 18 years old"
      ),
    idType: Yup.string().required("ID Type is required"),
    idNumber: Yup.string().required("ID Number is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const handleSubmit = async (values: {
    name: string;
    dob: string;
    idType: string;
    idNumber: string;
    phone: string;
  }) => {
    console.log(values);

    console.log(`    name: string;
    dob: string;
    idType: string;
    idNumber: string;
    phone: string;`);
    try {
      const res = await submitKycRequest(values);
      toast.success(res?.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        console.log("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Dialog
        open={isKycDialogueOpen}
        onOpenChange={() => setKycDialogueOpen(false)}
      >
        <DialogContent className="sm:max-w-[600px] max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Update KYC</DialogTitle>
            <DialogDescription>
              Before Making Transactions Update Your KYC
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{
              name: "",
              dob: startDate ? startDate.toISOString().split("T")[0] : "",
              idType: "",
              idNumber: "",
              phone: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Field
                    name="name"
                    as={Input}
                    className="col-span-3"
                    id="name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="col-span-4 text-red-600 text-right"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dob" className="text-right">
                    DOB
                  </Label>
                  <div className="relative max-w-sm col-span-3">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setFieldValue("dob", date);
                      }}
                      dateFormat="dd/MM/yyyy"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholderText="Select date"
                    />
                  </div>
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="col-span-4 text-red-600 text-right"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="idType" className="text-right">
                    ID Type
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={selectedValue}
                      onValueChange={(value) => {
                        setSelectedValue(value);
                        setFieldValue("idType", value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Id Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Id Type</SelectLabel>
                          <SelectItem value="aadhar">Aadhar card</SelectItem>
                          <SelectItem value="pan">Pan Card</SelectItem>
                          <SelectItem value="votersId">Voter Id</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <ErrorMessage
                    name="idType"
                    component="div"
                    className="col-span-4 text-red-600 text-right"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="idNumber" className="text-right">
                    ID Number
                  </Label>
                  <Field
                    name="idNumber"
                    as={Input}
                    className="col-span-3"
                    id="idNumber"
                    placeholder={`enter ${selectedValue} Number`}
                  />
                  <ErrorMessage
                    name="idNumber"
                    component="div"
                    className="col-span-4 text-red-600 text-right"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Field
                    name="phone"
                    as={Input}
                    type="number"
                    className="col-span-3"
                    id="phone"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="col-span-4 text-red-600 text-right"
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KycDialogue;
