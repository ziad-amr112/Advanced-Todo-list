import { z } from "zod";

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters." })
    .max(20, { message: "Title must not be longer than 20 characters." }),

  body: z
    .string()
    .max(160, { message: "Short Description must not be longer than 160 characters." })
    .optional(),

  completed: z.boolean(),

  priority: z.enum(["HIGH" ,"MEDIUM" , "LOW"]).default("MEDIUM").optional(),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;
