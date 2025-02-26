import { z } from "zod";

export const interestSchema = z.object({
  name: z.string().min(1, "Interest is required"),
});

export type InterestFormSchema = z.infer<typeof interestSchema>;
