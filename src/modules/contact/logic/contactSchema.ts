import { z } from "zod"

export const ContactInputSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email"),
})

export type ContactInput = z.infer<typeof ContactInputSchema>
