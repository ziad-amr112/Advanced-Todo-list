import { getTodo } from "@/actions/todoActions";
import Tasks from "@/components/Tasks";
import { auth } from "@clerk/nextjs/server";

export default async function Home({ searchParams = {} }: { searchParams?: { page?: string } }) {
  const { userId } = await auth();
  const page = Number(searchParams?.page) || 1;

  const { todos, totalTodos } = userId ? await getTodo({ userId, page }) : { todos: [], totalTodos: 0 };

  return (
    <div className="flex justify-center ">
      <Tasks todos={todos} userId={userId} totalTodos={totalTodos} currentPage={page} />
    </div>
  );
}
