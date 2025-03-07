"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
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
import { createTodo, deleteTodos } from "@/actions/todoActions";
import { Checkbox } from "./ui/checkbox";
import Spinner from "./spinner";
import { useEffect, useState } from "react";
import { ITodos } from "@/interfaces";
import ConfirmDeleteDialog from "./DeleteModel";
import PrioritySelector from "./Priority";
import { useTodoStore } from "@/app/store/todoStore";

interface AddToDoFormProps {
  todos: ITodos[];
  userId: string | null;
  refetchTodos: () => Promise<void>;
}

const AddToDoForm = ({ todos, userId,refetchTodos }: AddToDoFormProps) => {
  const { addTodoUI, setTodos,fetchTodos } = useTodoStore();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading) setOpen(false);
  }, [loading]);

  const onSubmit = async (data: TodoFormValues) => {
    setLoading(true);

    try {
      const newTodo = await createTodo({
        title: data.title,
        body: data.body,
        completed: data.completed,
        userId,
        priority: data.priority,
      });

      if (newTodo) {
        addTodoUI(newTodo);
      }
          await fetchTodos(userId, 1);

      form.reset({
        title: "",
        body: "",
        completed: false,
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const defaultValues: Partial<TodoFormValues> = {
    title: "",
    body: "",
    completed: false,
    priority: undefined
  };

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <div className="mb-4">
      <div className="flex justify-end gap-2">
      {todos.length > 1 && (
 <ConfirmDeleteDialog
 refetchTodos={refetchTodos}
 title="Delete All Todos?"
 description="Are you sure you want to delete all tasks? This action cannot be undone."
 onConfirm={async () => {
   try {
     setLoading(true);
     
     await deleteTodos(); 
     setTodos([]); 

     if (userId) {
       await refetchTodos();
     }

   } catch (error) {
     console.error("Error deleting all todos:", error);
   } finally {
     setLoading(false);
   }
 }}
 triggerIcon={
   <>
     Delete All Tasks <Trash size={16} />
   </>
 }
 className="p-2"
/>

)}


        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={14} />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a new Todo</DialogTitle>
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
        selectedPriority={field.value ?? "Select Priority"} 
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
                          <FormLabel htmlFor="completed-checkbox" className="cursor-pointer">
                            Mark as Completed
                          </FormLabel>
                        </div>
                        <FormDescription className="text-sm text-gray-500">
                          Your to-do item will be uncompleted by default unless you checked it.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? <Spinner /> : "Add Task"}
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddToDoForm;
