import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { ContactInputSchema } from "~/modules/contact/logic/contactSchema"
import { submitContact } from "~/modules/contact/logic/submitContact"
import { TRPCError } from "@trpc/server"
import { Prisma } from "@prisma/client"

export const contactRouter = createTRPCRouter({
  
  submit: publicProcedure
    .input(ContactInputSchema)
    .mutation(async ({ input }) => {
      try {
        return await submitContact(input)
      } catch (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2002"
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "This contact already exists.",
          })
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        })
      }
    }),
})

