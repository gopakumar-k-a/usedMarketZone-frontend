import { Button } from "@/components/ui/button";
import { RiSendPlaneFill } from "react-icons/ri";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendPostReplyAsMessage } from "@/api/chat";
import { toast } from "react-toastify";
import { useState } from "react";

interface AskProductDialogueProps {
  isAskProductModalOpen: boolean;
  setAskProductModalOpen: (isOpen: boolean) => void;
  postImageUrl: string;
  postOwnerId: string;
  postId: string;
}

const AskProductDialogue: React.FC<AskProductDialogueProps> = ({
  isAskProductModalOpen,
  setAskProductModalOpen,
  postImageUrl,
  postOwnerId,
  postId,
}) => {
  const [reply, setReply] = useState("");
  const postSendPostReplyAsMessage = async (
    productId: string = postId,
    message: string = reply,
    recieverId: string = postOwnerId
  ) => {
    try {
      const response = await sendPostReplyAsMessage(
        message,
        productId,
        recieverId
      );
      if (response) {
        console.log(response);
        toast.success("reply sended success fully");
      }
    } catch (error) {
      console.log(error);
      toast.error("cant send reply !");
    } finally {
      setReply("");
      setAskProductModalOpen(false);
    }
  };
  return (
    <>
      <Dialog
        open={isAskProductModalOpen}
        onOpenChange={() => setAskProductModalOpen(false)}
      >
        <DialogContent className="sm:max-w-[600px] max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Ask Product From Owner</DialogTitle>
            <DialogDescription>
              Interact with the Product Owner and Ask to Buy The Product
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-32 max-w-32">
            <img
              src={postImageUrl}
              alt="product-image"
              className="object-contain"
            />
          </div>
          <div className="grid gap-4 py-4">
            <Label htmlFor="name" className="text-right">
              Send Message
            </Label>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                // defaultValue="Pedro Duarte"
                placeholder={`Hi , I would like to Buy your Product`}
                className="col-span-3"
                onChange={(e) => setReply(e.target.value)}
              />
              <Button
                type="button"
                onClick={() => postSendPostReplyAsMessage()}
                disabled={!reply}
              >
                <RiSendPlaneFill />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AskProductDialogue;
