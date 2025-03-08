"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useTodoStore } from "@/app/store/todoStore";

interface ConfirmDeleteDialogProps {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
  onCancel?: () => void;
  triggerIcon: ReactNode;
  className?: string;
  todoId?: string;
  refetchTodos?: () => Promise<void>; 
}

const ConfirmDeleteDialog = ({
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
  onCancel,
  triggerIcon,
  refetchTodos,
  todoId,
}: ConfirmDeleteDialogProps) => {
  const { deleteTodoUI } = useTodoStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      deleteTodoUI(todoId || ""); 
      if (refetchTodos) {
        await refetchTodos(); 
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Error in ConfirmDeleteDialog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (onCancel) onCancel();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-gray-500 text-red-400 hover:text-red-500  dark:text-red-300 dark:hover:text-red-400 ">
          {triggerIcon}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center text-center">
          <AlertTriangle className="w-12 h-12 text-red-500" />
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-3">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : null}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
