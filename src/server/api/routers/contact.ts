import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { ContactInputSchema } from "~/modules/contact/logic/contactSchema"
import { submitContact } from "~/modules/contact/logic/submitContact"

export const contactRouter = createTRPCRouter({
  submit: publicProcedure
    .input(ContactInputSchema)
    .mutation(async ({ input }) => {
      return submitContact(input)
    }),
})
