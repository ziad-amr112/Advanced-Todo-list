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

export default function TodosTable({ todos, totalTodos }: { todos: ITodos[], totalTodos: number }) {
  return (
    <div className="flex flex-col items-center">
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
            <TableRow
              key={todo?.id}>
              <TableCell className={todo?.completed ? "line-through " : ""}>
                {todo?.title}
              </TableCell>
              <TableCell>
                {todo?.completed ? (
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-200 text-gray-800">Completed</Badge>
                ) : (
                  <Badge variant="secondary">Uncompleted</Badge>
                )}
              </TableCell>
              <TableCell>{todo?.priority}</TableCell>
              <TodosActions todo={todo} />
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
    </div>
  );
}
