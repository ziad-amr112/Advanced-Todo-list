
import TaskWrapper from "@/components/TaskWrapper";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();

  return (
    <>
      <TaskWrapper userId={userId} />
    </>
  );
}
