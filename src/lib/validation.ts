import { z } from "zod";

// Input sanitization helper
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000); // Limit length
};

// Validation schemas
export const profileUpdateSchema = z.object({
  display_name: z
    .string()
    .min(1, "Display name is required")
    .max(100, "Display name must be less than 100 characters")
    .refine((val) => !/<script|javascript:|on\w+=/i.test(val), {
      message: "Invalid characters detected"
    }),
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional()
    .refine((val) => !val || !/<script|javascript:|on\w+=/i.test(val), {
      message: "Invalid characters detected"
    }),
  phone: z
    .string()
    .max(20, "Phone number must be less than 20 characters")
    .optional()
    .refine((val) => !val || /^[\d\s\-\+\(\)]+$/.test(val), {
      message: "Invalid phone number format"
    }),
  website: z
    .string()
    .max(200, "Website URL must be less than 200 characters")
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val) || val === '', {
      message: "Website must be a valid URL starting with http:// or https://"
    }),
  location: z
    .string()
    .max(100, "Location must be less than 100 characters")
    .optional()
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;