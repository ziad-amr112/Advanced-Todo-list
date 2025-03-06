"use server";

import { ITodos } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();


export const getTodo = async ({
  userId,
  page = 1,
  pageSize = 10, 
}: {
  userId: string | null;
  page?: number;
  pageSize?: number;
}) => {
  if (!userId) return { todos: [], totalTodos: 0 };

  // حساب العدد الكلي للمهام
  const totalTodos = await prisma.todo.count({
    where: { userId },
  });

  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: [
      { priority: "asc" },
      { createdAt: "desc" },
    ],
    skip: (page - 1) * pageSize, 
    take: pageSize, 
  });

  return { todos, totalTodos };
};



export const createTodo = async ({
  title,
  body,
  completed,
  priority,
  userId,
}: {
  title: string;
  completed: boolean;
  body?: string;
  priority?: "HIGH" | "MEDIUM" | "LOW"
  userId: string | null;
}) => {
  if (!userId) {
    throw new Error("userId is required and must be a valid string.");
  }

  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
      priority: priority as "HIGH" | "MEDIUM" | "LOW", 
      userId,
    },
  });

  revalidatePath("/");
};

export const updateTodo = async ({ id, title, body, completed, priority }: ITodos) => {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      completed,
      priority: priority?.toUpperCase() as "HIGH" | "MEDIUM" | "LOW", 
    },
  });
  revalidatePath("/");
};


export const deleteTodo = async ({ id }: { id: string }) => {
  const deletedTodo = await prisma.todo.delete({
    where: { id },
  });

  revalidatePath("/");

  return deletedTodo; 
};


export const deleteTodos = async () => {
  const deleted = await prisma.todo.deleteMany();
  revalidatePath("/");
  return deleted.count; 
};
