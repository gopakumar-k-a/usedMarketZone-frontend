import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductInterface from "@/types/product";

export function UserPostDetailsDialogue({ isOpen, onClose, postDetails }:{ isOpen:boolean, onClose:()=>void, postDetails:ProductInterface }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Post Details</DialogTitle>
          <DialogDescription>Block Or Unblock Post</DialogDescription>
        </DialogHeader>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 mb-4">
              <img
                className="w-full h-auto rounded object-cover"
                src={postDetails.productImageUrls[0]} // Use the first image for now
                alt="Product Image 1"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">{postDetails.productName}</h2>
              <div className="flex items-center mb-2">
                <p className="text-gray-700 mr-2">Category:</p>
                <span className="text-blue-500 font-semibold">{postDetails.category}</span>
                <span className="text-gray-500 ml-2">/</span>
                <span className="text-blue-500 font-semibold">
                  {postDetails.subCategory}
                </span>
              </div>
              <p className="text-lg font-medium mb-2">
                &#8377; {postDetails.basePrice}
              </p>
              <p className="text-gray-600 mb-4">Description: {postDetails.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <p className="text-gray-600">
                  Product Condition: {postDetails.productCondition}
                </p>
                <p className="text-gray-600">Product Age: {postDetails.productAge}</p>
                <p className="text-gray-600">
                  Posted: {new Date(postDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700">
                  Contact Seller
                </button>
                <button className="px-4 py-2 border border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-100">
                  Reports on Product
                </button>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">Additional Details</h3>
          <p className="text-gray-600">
            Posted Date: {new Date(postDetails.createdAt).toLocaleDateString()}
          </p>{" "}
          {/* Added posted date */}
          {/* Add phone number and address if needed (assuming they're not displayed in the public view) */}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
