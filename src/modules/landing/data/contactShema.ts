import { z } from "zod"

export const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email(),
})

export type ContactInput = z.infer<typeof contactSchema>
