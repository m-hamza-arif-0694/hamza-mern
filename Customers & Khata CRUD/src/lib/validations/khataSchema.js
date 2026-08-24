import { z } from 'zod';

export const khataEntryCreateSchema = z.object({
  customerId: z.string({ required_error: 'Customer ID is required' }).min(1, 'Customer ID cannot be empty').optional(),
  
  type: z.enum(['GAVE_CREDIT', 'GOT_PAYMENT', 'gave', 'got'], {
    required_error: 'Transaction type is required',
    invalid_type_error: "Type must be 'GAVE_CREDIT' (You gave) or 'GOT_PAYMENT' (You got)"
  }),

  amount: z
    .union([z.number(), z.string()], { required_error: 'Amount is required' })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Transaction amount must be a positive number greater than 0'
    })
    .refine((val) => val <= 10000000, {
      message: 'Transaction amount cannot exceed Rs. 10,000,000'
    }),

  paymentMethod: z
    .enum(['Cash', 'Bank Transfer', 'EasyPaisa', 'JazzCash', 'Cheque', 'Credit Card'], {
      invalid_type_error: 'Invalid payment method selected'
    })
    .default('Cash'),

  description: z
    .string()
    .trim()
    .max(500, { message: 'Description cannot exceed 500 characters' })
    .optional()
    .or(z.literal('')),

  billNumber: z
    .string()
    .trim()
    .max(50, { message: 'Bill/Invoice number cannot exceed 50 characters' })
    .optional()
    .or(z.literal('')),

  date: z
    .union([z.string(), z.date()])
    .optional()
    .default(() => new Date().toISOString())
});

export const khataEntryUpdateSchema = khataEntryCreateSchema.partial();
