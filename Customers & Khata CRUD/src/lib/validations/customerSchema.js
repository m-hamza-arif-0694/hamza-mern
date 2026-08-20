import { z } from 'zod';

/**
 * Pakistani Phone Regex:
 * Matches +923001234567, 03001234567, 923001234567, 3001234567
 */
export const pakistaniPhoneRegex = /^(?:\+92|92|0)?3[0-9]{9}$/;

export const customerCreateSchema = z.object({
  name: z
    .string({ required_error: 'Customer name is required' })
    .trim()
    .min(2, { message: 'Customer name must be at least 2 characters long' })
    .max(100, { message: 'Customer name cannot exceed 100 characters' }),
  
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .refine((val) => pakistaniPhoneRegex.test(val.replace(/\s+/g, '')), {
      message: 'Enter a valid Pakistani mobile number (e.g. +923001234567 or 03001234567)'
    }),
  
  email: z
    .string()
    .trim()
    .email({ message: 'Enter a valid email address' })
    .optional()
    .or(z.literal('')),

  address: z
    .string()
    .trim()
    .max(250, { message: 'Address cannot exceed 250 characters' })
    .optional()
    .or(z.literal('')),

  city: z
    .string()
    .trim()
    .max(50, { message: 'City name cannot exceed 50 characters' })
    .optional()
    .default('Lahore'),

  category: z
    .enum(['Retail', 'Wholesale', 'Distributor', 'VIP', 'General'], {
      invalid_type_error: 'Category must be Retail, Wholesale, Distributor, VIP, or General'
    })
    .default('Retail'),

  creditLimit: z
    .union([z.number(), z.string()])
    .transform((val) => Number(val) || 0)
    .pipe(
      z.number().min(0, { message: 'Credit limit cannot be negative' }).max(100000000, { message: 'Credit limit exceeds maximum allowed' })
    )
    .optional()
    .default(0),

  initialBalance: z
    .union([z.number(), z.string()])
    .transform((val) => Number(val) || 0)
    .optional()
    .default(0),

  status: z
    .enum(['active', 'inactive', 'blocked'], {
      invalid_type_error: 'Status must be active, inactive, or blocked'
    })
    .default('active'),

  notes: z
    .string()
    .trim()
    .max(500, { message: 'Notes cannot exceed 500 characters' })
    .optional()
    .or(z.literal(''))
});

export const customerUpdateSchema = customerCreateSchema.partial();

export const customerQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  balanceType: z.enum(['all', 'receivable', 'payable', 'settled']).optional(),
  sortBy: z.enum(['name', 'netBalance', 'creditLimit', 'createdAt', 'updatedAt']).optional().default('updatedAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z.union([z.string(), z.number()]).transform((v) => Math.max(1, Number(v) || 1)).optional().default(1),
  limit: z.union([z.string(), z.number()]).transform((v) => Math.min(100, Math.max(1, Number(v) || 20))).optional().default(20)
});
