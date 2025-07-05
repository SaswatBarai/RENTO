import {z} from "zod";

export const registerSchema = z.object({
    fullname:z.string()
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must not exceed 50 characters")
    .trim(),
    email:z.string()
    .email("Invalid email address")
    .trim(),
    password: z.string()
    .min(6, 'Password must be at least 6 characters long.')
    .max(100, 'Password cannot exceed 100 characters.')
    .refine((val) => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter.',
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine((val) => /[^a-zA-Z0-9]/.test(val), {
      message: 'Password must contain at least one special character.',
    })

})

export const loginSchema = z.object({
    email:z.string()
    .email("Invalid email address")
    .trim(),
    password: z.string()
    .min(6, 'Password must be at least 6 characters long.')
    .max(100, 'Password cannot exceed 100 characters.')
})