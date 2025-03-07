"use client";

import { useState } from "react";
import { Trash, Loader2 } from "lucide-react"; 
import ConfirmDeleteDialog from "@/components/DeleteModel";
import { deleteTodo } from "@/actions/todoActions";
import EditToDoForm from "./EditTodoForm";
import { ITodos } from "@/interfaces";
import { useTodoStore } from "@/app/store/todoStore";

interface TodosActionsProps {
  todo: ITodos;
  userId: string; 
  pageFromUrl: number;
}

export default function TodosActions({ todo, userId, pageFromUrl }: TodosActionsProps) {
  const [loading, setLoading] = useState(false);
  const { deleteTodoUI, fetchTodos } = useTodoStore();

  const handleDelete = async () => {
    if (!todo.id) return;
    setLoading(true);
    
    try {
      await deleteTodo({ id: todo.id }); 
      deleteTodoUI(todo.id); 
      fetchTodos(userId, pageFromUrl); 
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 justify-end">
    <EditToDoForm todo={todo} />
    <ConfirmDeleteDialog
      title="Delete Todo?"
      description="Are you sure you want to delete this task? This action cannot be undone."
      onConfirm={handleDelete}
      todoId={todo.id || ""} 
      triggerIcon={
        loading ? <Loader2 size={16} className="animate-spin" /> : <Trash size={16} />
      }
      className={`p-2 ${loading ? "opacity-50 pointer-events-none" : ""}`}
    />
  </div>
  
  );
}
