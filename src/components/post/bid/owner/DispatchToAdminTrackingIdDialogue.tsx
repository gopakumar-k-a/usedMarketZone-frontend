import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CustomAlertDialogue } from "@/components/alert/CustomAlertDialogue";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

export default function DispatchToAdminTrackingIdDialogue({
  isOpen,
  onClose,
  productId,
  dummyAddress = "Used Market Zone, Kochi, Kerala...",
  uploadTrackingNumberOfProductToAdmin
}: {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  dummyAddress?: string;
  uploadTrackingNumberOfProductToAdmin: (trackingNumber: string, productId: string) => void
}) {
  const [isCustomAlertDialogueOpen, setCustomAlertDialogueOpen] =
    useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");



  const validationSchema = Yup.object().shape({
    trackingNumber: Yup.string().required("Tracking number is required"),
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Tracking Number of Product</DialogTitle>
            <DialogDescription>
              Enter the tracking number for the product to be shipped to the
              following address:
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <p className="text-sm font-medium">Shipping Address:</p>
              <p className="text-gray-700">{dummyAddress}</p>
            </div>
            <Formik
              initialValues={{ trackingNumber: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setTrackingNumber(values.trackingNumber);
                setCustomAlertDialogueOpen(true);
                setSubmitting(false);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tracking-number" className="text-right">
                      Tracking Number
                    </Label>
                    <Field
                      id="tracking-number"
                      name="trackingNumber"
                      placeholder="Enter tracking number here"
                      className="col-span-3"
                      as={Input}
                    />
                    {errors.trackingNumber && touched.trackingNumber ? (
                      <div className="col-span-4 text-red-600 text-sm">
                        {errors.trackingNumber}
                      </div>
                    ) : null}
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      Confirm Dispatch
                    </Button>
                  </DialogFooter>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
      {isCustomAlertDialogueOpen && (
        <CustomAlertDialogue
          isOpen={isCustomAlertDialogueOpen}
          onClose={() => setCustomAlertDialogueOpen(false)}
          title="Confirm Continue"
          description={`Confirm tracking number ${trackingNumber}. This can't be undone.`}
          onContinue={() => {
            uploadTrackingNumberOfProductToAdmin(trackingNumber, productId);
            setCustomAlertDialogueOpen(false);
            onClose(); // Close the main dialog after confirming
          }}
        />
      )}
    </>
  );
}
