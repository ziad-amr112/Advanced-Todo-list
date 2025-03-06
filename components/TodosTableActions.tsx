"use client";

import { useState } from "react";
import {  Trash } from "lucide-react";
import ConfirmDeleteDialog from "@/components/DeleteModel";
import { deleteTodo } from "@/actions/todoActions";
import { TableCell } from "./ui/table";
import EditToDoForm from "./EditTodoForm";
import { ITodos } from "@/interfaces";

export default function TodosActions({ todo }: { todo: ITodos }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteTodo({ id: todo.id as string });
    setLoading(false);
  };

  return (
    <TableCell className="flex items-center space-x-2 justify-end">
     <EditToDoForm todo={todo}/>

      <ConfirmDeleteDialog
        title="Delete Todo?"
        description="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDelete}
        triggerIcon={<Trash size={16} />}
        className="p-2"
      />
    </TableCell>
  );
}
