import { z } from 'zod';

// Shared User Types
export const UserSchema = z.object({
  id: z.string(),
  firebase_uid: z.string(),
  email: z.string().email(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// Shared Transaction Types
export const TransactionTypeSchema = z.enum(['INCOME', 'EXPENSE']);
export const TransactionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  amount: z.number().positive(),
  
  type: TransactionTypeSchema,
  category: z.string(),
  description: z.string().optional(),
  date: z.date(),
  created_at: z.date(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

// Shared Budget Types
export const BudgetSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  category: z.string(),
  limit: z.number().positive(),
  created_at: z.date(),
});

export type Budget = z.infer<typeof BudgetSchema>;

// Shared Goal Types
export const GoalSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: z.string(),
  target_amount: z.number().positive(),
  saved_amount: z.number().nonnegative(),
  deadline: z.date(),
});

export type Goal = z.infer<typeof GoalSchema>;
