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
  refetchTodos: () => void;
}

const Tasks = ({ todos, userId, totalTodos, currentPage, refetchTodos }: TasksProps) => {
  const [filteredTodos, setFilteredTodos] = useState<ITodos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  
  const router = useRouter();
  const pageSize = 10;

  const totalPages = Math.ceil(totalTodos / pageSize);

  useEffect(() => {
    if (todos.length > 0) {
      setFilteredTodos(todos);  
      setLoading(false);  
    }
  }, [todos]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setLoading(true);  
      router.push(`?page=${page}`);
      refetchTodos()
    }
  };

  const onFilterChange = (filters: { priority: string | null; completed: boolean | null }) => {
    setLoading(true); 
    let filtered = todos;

    if (filters.priority) {
      filtered = filtered.filter(todo => todo.priority === filters.priority);
    }

    if (filters.completed !== null) {
      filtered = filtered.filter(todo => todo.completed === filters.completed);
    }

    setFilteredTodos(filtered);
    setLoading(false);  
    refetchTodos();
  };

  return (
    <main className="container">
      {userId && <AddToDoForm userId={userId} todos={todos} />}
      <TaskFilter onFilter={onFilterChange} />
      
      {loading ? (
        <TasksSkeleton />  
      ) : (
        <TodosTable userId={userId} currentPage={currentPage} todos={filteredTodos} totalTodos={totalTodos} />
      )}

      <TasksPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </main>
  );
};

export default Tasks;
