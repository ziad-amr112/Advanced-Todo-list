"use client";

import { useEffect, useState } from "react";
import { useTodoStore } from "@/app/store/todoStore";
import { getTodo } from "@/actions/todoActions";
import Tasks from "@/components/Tasks";
import { SearchParamsProvider } from "./SearchParamsProvider";

interface TaskWrapperProps {
  userId: string | null;
}

export default function TaskWrapper({ userId }: TaskWrapperProps) {
  const { todos, setTodos, totalTodos, setTotalTodos } = useTodoStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const HandlefetchTodos = async (pageFromUrl: number) => {
    if (!userId) return;
    try {
      const { todos, totalTodos } = await getTodo({ userId, page: pageFromUrl });
      setTodos(todos);
      setTotalTodos(totalTodos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      HandlefetchTodos(page);
    }
  };

  useEffect(() => {
    if (userId) {
      HandlefetchTodos(currentPage);
    }
  }, [currentPage, userId]);

  return (
    <div suppressHydrationWarning={true} className="flex justify-center">
      <SearchParamsProvider onPageChange={handlePageChange} />
      <Tasks
        todos={todos}
        userId={userId}
        totalTodos={totalTodos}
        currentPage={currentPage}
        refetchTodos={() => HandlefetchTodos(currentPage)}
      />
    </div>
  );
}
