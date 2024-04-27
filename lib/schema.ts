import { z } from "zod";

export const signupSchema = z
  .object({
    companyName: z
      .string()
      .min(2, { message: "Company name must be at least 2 characters." }),
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email address is required" })
      .email({ message: "Invalid email address" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must include upper and lower case letters, numbers, and special characters",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signupCodeSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
