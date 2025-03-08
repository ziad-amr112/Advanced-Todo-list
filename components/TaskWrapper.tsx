"use client"

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getTodo } from "@/actions/todoActions";
import Tasks from "@/components/Tasks";
import { useTodoStore } from "@/app/store/todoStore";

interface TaskWrapperProps {
  userId: string | null;
}

export default function TaskWrapper({ userId }: TaskWrapperProps) {
  const searchParams = useSearchParams();
  const [pageFromUrl, setPageFromUrl] = useState<number>(1);

  const { todos, setTodos, totalTodos, setTotalTodos } = useTodoStore();

  const fetchTodos = useCallback(async () => {
    if (!userId) return;
    try {
      const { todos, totalTodos } = await getTodo({ userId, page: pageFromUrl });
      setTodos(todos);
      setTotalTodos(totalTodos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }, [userId, pageFromUrl, setTodos, setTotalTodos]);

  useEffect(() => {
    const page = Number(searchParams.get("page"));
    if (!isNaN(page) && page > 0) {
      setPageFromUrl(page);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, pageFromUrl]); 

  return (
    <div suppressHydrationWarning={true} className="flex justify-center">
      <Tasks
        todos={todos}
        userId={userId}
        totalTodos={totalTodos}
        currentPage={pageFromUrl}
        refetchTodos={fetchTodos}
      />
    </div>
  );
}
