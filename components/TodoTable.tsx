import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITodos } from "@/interfaces";
import { Badge } from "./ui/badge";
import TodosActions from "./TodosTableActions";

export default function TodosTable({
  todos,
  totalTodos,
  userId,
  currentPage,
}: {
  todos: ITodos[];
  totalTodos: number;
  userId: string | null;
  currentPage: number;
}) {
  const getPriorityBadge = (
    priority: "HIGH" | "MEDIUM" | "LOW" | undefined
  ) => {
    switch (priority) {
      case "HIGH":
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
            High
          </span>
        );
      case "MEDIUM":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            Medium
          </span>
        );
      case "LOW":
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            Low
          </span>
        );
    }
  };

  return (
    <Table>
      <TableCaption>A list of your recent Todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
            <TableRow key={todo?.id}>
              <TableCell className={todo?.completed ? "line-through" : ""}>
                {todo?.title}
              </TableCell>
              <TableCell>
                {todo?.completed ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 dark:bg-green-200 text-gray-800">
                    Completed
                  </Badge>
                ) : (
                  <Badge variant="secondary">Uncompleted</Badge>
                )}
              </TableCell>

              <TableCell>{getPriorityBadge(todo?.priority)}</TableCell>
              <TableCell className="text-right">
                {userId ? (
                  <TodosActions
                    todo={todo}
                    userId={userId}
                    pageFromUrl={currentPage}
                  />
                ) : null}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Todos</TableCell>
          <TableCell className="text-right">{totalTodos}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
