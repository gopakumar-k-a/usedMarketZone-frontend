import React,{ forwardRef } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const AlertDialogBlock =({userData,isOpen,onClose,changeIsActive }) => (
  <AlertDialog.Root  open={isOpen} onOpenChange={onClose}>
    <AlertDialog.Trigger />
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Are you sure?
        </AlertDialog.Title>
        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            {userData.isActive?( `This will  Block the Access of ${userData.email} To The webSite`):(`This will UnBlock the Access of ${userData.email} from the website`)}
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="bg-white-600 text-black hover:text-white rounded-lg hover:bg-gray-700  p-2  border-2 border-black">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            {userData.isActive==true?(<button onClick={()=>changeIsActive()}  className="bg-red-600 text-white rounded-lg hover:bg-red-700 hover:text-white p-2  border-2 border-black">
              Yes, Block
            </button>):(<button onClick={()=>changeIsActive()} className="bg-green-600 text-white rounded-lg hover:bg-green-700 hover:text-white p-2  border-2 border-black">
              Yes, UnBlock
            </button>)}
            
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default AlertDialogBlock;