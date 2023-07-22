import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  title: z.string(),
  lockedBudget: z.number(),
  actualCost: z.number(),
  label: z.any(),
});

export type Task = z.infer<typeof taskSchema>;
