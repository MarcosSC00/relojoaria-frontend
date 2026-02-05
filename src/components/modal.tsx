import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";
import type { ReactNode } from "react";

interface MoadalProps {
  tiltle: string;
  children: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
  setOpen?: (isOpen: boolean) => void;
}

export function Modal({
  tiltle,
  children,
  trigger,
  open,
  setOpen,
}: MoadalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {trigger ? (
        trigger
      ) : (
        <Dialog.Trigger
          className="rounded-sm bg-[#031D3B] hover:bg-[#021327] hover:scale-90 
        transition-all duration-150"
        >
          <Plus size={24} className="text-gray-50" />
        </Dialog.Trigger>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-500/50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-y-1/2 
              -translate-x-1/2 w-[400px] h-fit bg-white p-4 
        shadow-md rounded-md mx-auto"
        >
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title
              className="text-md font-bold text-center px-2 text-gray-50 bg-[#031D3B]
              rounded-md w-fit"
            >
              {tiltle}
            </Dialog.Title>
            <Dialog.Description />
            <Dialog.Close>
              <X className="text-gray-400" />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
