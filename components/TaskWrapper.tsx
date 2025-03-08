"use client";

import { getTodo } from "@/actions/todoActions";
import Tasks from "@/components/Tasks";
import { useEffect, useCallback, useState } from "react";
import { useTodoStore } from "@/app/store/todoStore";
import SearchParamsProvider from "@/components/SearchParamsProvider"; 

interface TaskWrapperProps {
  userId: string | null;
}

export default function TaskWrapper({ userId }: TaskWrapperProps) {
  const [pageFromUrl, setPageFromUrl] = useState(1);
  const { todos, setTodos, totalTodos, setTotalTodos } = useTodoStore();

  const handlePageChange = (page: number) => {
    setPageFromUrl(page);
  };

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
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div suppressHydrationWarning={true} className="flex justify-center">
      <SearchParamsProvider onPageChange={handlePageChange} />

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
