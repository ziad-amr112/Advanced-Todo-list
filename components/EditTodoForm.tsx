"use client";

import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { todoFormSchema, TodoFormValues } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import Spinner from "./spinner";
import { useEffect, useState } from "react";
import { ITodos } from "@/interfaces";
import { updateTodo } from "@/actions/todoActions";
import PrioritySelector from "./Priority";
import { useTodoStore } from "@/app/store/todoStore";

const EditToDoForm = ({ todo }: { todo: ITodos }) => {
  const { updateTodoUI, fetchTodos } = useTodoStore();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: todo.title,
      body: todo.body as string,
      completed: todo.completed,
      priority: todo.priority,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.setValue("title", todo.title);
    form.setValue("body", todo.body as string);
    form.setValue("completed", todo.completed);
    form.setValue("priority", todo.priority);
  }, [todo, form]);

  const onSubmit = async (data: TodoFormValues) => {
    setLoading(true);
    try {
      await updateTodoUI({
        id: todo.id,
        title: data.title,
        body: data.body || "",
        completed: data.completed,
        priority: data.priority,
      });

      await updateTodo({
        id: todo.id,
        title: data.title,
        body: data.body as string,
        completed: data.completed,
        priority: data.priority,
      });

      if (todo.userId) {
        await fetchTodos(todo.userId, 1);
      }

      form.reset(data);
      setOpen(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 p-3 text-sm">
          <Pen size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit your Todo</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Go to the gym" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add some details about the task"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      You can write additional notes about the task here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <PrioritySelector
                      selectedPriority={
                        field.value as "HIGH" | "MEDIUM" | "LOW"
                      }
                      onSelect={field.onChange}
                    />
                    <FormDescription className="text-sm text-gray-500">
                      Choose a priority level for your task (High, Medium, Low).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="completed-checkbox"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="completed-checkbox"
                        className="cursor-pointer"
                      >
                        Mark as Completed
                      </FormLabel>
                    </div>
                    <FormDescription className="text-sm text-gray-500">
                      Your to-do item will be uncompleted by default unless you
                      checked it.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading && <Spinner />} Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditToDoForm;
