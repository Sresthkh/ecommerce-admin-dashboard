import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock must be 0 or more"),
  category: z.string().optional(),
  description: z.string().optional(),

  sales: z.number().int().nonnegative(),
});

export type ProductInput = z.infer<typeof productSchema>;
