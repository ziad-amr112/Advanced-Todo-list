"use client";

import { getTodo } from "@/actions/todoActions";
import Tasks from "@/components/Tasks";
import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTodoStore } from "@/app/store/todoStore";

interface TaskWrapperProps {
  userId: string | null;
}

export default function TaskWrapper({ userId }: TaskWrapperProps) {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const { todos, setTodos, totalTodos, setTotalTodos } = useTodoStore();

  const fetchTodos = useCallback(async () => {
    if (!userId) return; 
    try {
      const { todos, totalTodos } = await getTodo({ userId, page: pageFromUrl });
      setTodos(todos);
      setTotalTodos(totalTodos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
    }
  }, [userId, pageFromUrl, setTodos, setTotalTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); 
  return (
    <div className="flex justify-center">
        <Tasks
          todos={todos}
          userId={userId}
          totalTodos={totalTodos}
          currentPage={pageFromUrl}
          refetchTodos={fetchTodos}/>
      
    </div>
  );
}
