import { nullable, z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const callSchema = z.object({
  id: z.string(),
  Call_Name: z.string(),
  Call_Recording: z.string(),
  DeepGram: z.string().nullable(),
});

export type Calls = z.infer<typeof callSchema>;
