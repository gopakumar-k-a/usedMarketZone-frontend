import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"
import { ClaimerAddress } from '@/types/bid';
const ClaimerAddressDialogue = ({ isOpen, onClose, details }:{isOpen:boolean,onClose:()=>void,details:ClaimerAddress}) => {
  const { country, state, district, city, postalCode, phone } = details;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Show Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
          <DialogDescription>Here are the details you provided:</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Country:</Label>
            <p className="col-span-3">{country}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">State:</Label>
            <p className="col-span-3">{state}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">District:</Label>
            <p className="col-span-3">{district}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">City:</Label>
            <p className="col-span-3">{city}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Postal Code:</Label>
            <p className="col-span-3">{postalCode}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Phone:</Label>
            <p className="col-span-3">{phone}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimerAddressDialogue;
