"use client";

import { useEffect, useState } from "react";
import AddToDoForm from "@/components/AddToDoForm";
import TaskFilter from "@/components/Filter";
import TodosTable from "@/components/TodoTable";
import { ITodos } from "@/interfaces";
import { useRouter } from "next/navigation";
import { TasksPagination } from "./pagination";
import TasksSkeleton from "./Skeleton";

interface TasksProps {
  todos: ITodos[];
  userId: string | null;
  totalTodos: number;
  currentPage: number;
}

const Tasks = ({ todos, userId, totalTodos, currentPage }: TasksProps) => {
  const [filteredTodos, setFilteredTodos] = useState<ITodos[]>(todos);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pageSize = 10;

  const totalPages = Math.ceil(totalTodos / pageSize);

  const handlePageChange = (page: number) => {
    setLoading(true);
    router.push(`?page=${page}`);
  };

  useEffect(() => {
    setFilteredTodos(todos);
    setLoading(false); 
  }, [todos]);

  const onFilterChange = (filters: { priority: string | null; completed: boolean | null }) => {
    let filtered = [...todos];

    if (filters.priority) {
      filtered = filtered.filter(todo => todo.priority === filters.priority);
    }

    if (filters.completed !== null) {
      filtered = filtered.filter(todo => todo.completed === filters.completed);
    }

    setFilteredTodos(filtered);
  };

  return (
    <main className="container">
      {userId && <AddToDoForm userId={userId} todos={todos} />}
      <div className="items-start gap-4">
        <TaskFilter onFilter={onFilterChange} />
        {loading ? <TasksSkeleton /> : <TodosTable todos={filteredTodos} totalTodos={totalTodos} />}
      </div>

      {/* Pagination Controls */}
      <TasksPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Tasks;
