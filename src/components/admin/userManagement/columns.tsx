"use client";
import { useState, useRef, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import AlertDialogBlock from "./AlertDialogBlock";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LuUser } from "react-icons/lu";
import { FaCopy } from "react-icons/fa6";
import { modifyUserAccess } from "@/api/admin";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  _id: string;
  email: string;
  isActive: boolean;
};

// const navigate=useNavigate()

export const columns = (
  userData: User[],
  setUserData: React.Dispatch<React.SetStateAction<User[]>>,
  currentPage: number,
  limit: number,
  navigate: (path: string, state?: any) => void
): ColumnDef<User>[] => [
  {
    header: "Sl No",
    cell: (info) => (currentPage - 1) * limit + info.row.index + 1, // Adjust '5' based on your pagination limit
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isActive",
    header: "User Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("isActive") == true ? "active" : "not-active"}
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: " ",
    cell: ({ row }) => {
      const user = row.original;
      const [isUpdating, setIsUpdating] = useState(false);
      const [isActive, setIsActive] = useState(user.isActive);
      const [showDialog, setShowDialog] = useState(false);

      // const triggerDialogue = useRef< HTMLButtonElement | null>(null);

      const handleToggleActive = async () => {
        setIsUpdating(true);
        setIsActive(!isActive);

        try {
        } catch (error) {
          console.error("Error updating user isActive status:", error);
        } finally {
          setIsUpdating(false);
        }
      };
      // const handleClick = () => {
      //   setShowDialog(true);
      //   if (triggerDialogue.current) {
      //     trigger.current.click();
      //   }
      // };

      // const onConfirm = () => {
      //   handleToggleActive();
      //   setShowDialog(false);
      // };

      const handleOpenDialog = () => {
        setShowDialog(true);
      };

      const handleCloseDialog = () => {
        setShowDialog(false);
      };

      const changeIsActive = async (userId = user._id) => {
        const { updatedUser } = await modifyUserAccess(userId);

        const newUserData = userData.map((data) => {
          if (data._id == updatedUser._id) {
            data.isActive = !data.isActive;
          }
          return data;
        });
        setUserData(newUserData);
      };


      return (
        <>
          {isActive ? (
            <Button
              variant="outline"
              onClick={handleOpenDialog}
              disabled={isUpdating}
              className="bg-red-600 text-white rounded-lg hover:bg-red-700 hover:text-white"
            >
              Block
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleOpenDialog}
              disabled={isUpdating}
              className="bg-green-600 text-white rounded-lg hover:bg-green-700 hover:text-white"
            >
              Un-Block
            </Button>
          )}

          {showDialog && (
            <AlertDialogBlock
              userData={user}
              isOpen={showDialog}
              onClose={handleCloseDialog}
              changeIsActive={changeIsActive}
            />
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              <FaCopy className="dark:text-white text-black mr-2" />
              Copy User Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>navigate("/admin/user-profile",{state:{userId:user._id}})}>
            {/* <DropdownMenuItem > */}
              <LuUser className="text-red-600 mr-2" />
              View User Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
