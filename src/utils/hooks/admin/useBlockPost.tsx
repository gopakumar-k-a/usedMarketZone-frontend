import { useState } from "react";
import { blockPostAdmin } from "@/api/admin"; // Assuming this is the correct API call
import { toast } from "react-toastify";

function useBlockPost(initialIsBlocked: boolean) {
  const [isBlocked, setIsBlocked] = useState<boolean>(initialIsBlocked);

  const blockPost = async (productId: string) => {
    try {
      const { productIsBlocked, message } = await blockPostAdmin(productId);
      setIsBlocked(productIsBlocked);
      toast.success(message || "Post status updated successfully");
    } catch (error) {
      setIsBlocked(isBlocked);
      console.error("Error blocking the post:", error);
      toast.error("Failed to update post status");
    }
  };

  return { isBlocked, blockPost };
}

export default useBlockPost;
