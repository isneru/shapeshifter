import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const dayFieldsRouter = createTRPCRouter({
  resetWeek: publicProcedure.input(z.object({ userId: z.string() })).mutation(async ({ input, ctx }) => {
    const userDays = await ctx.prisma.day.findMany({
      where: {
        userId: input.userId
      }
    })

    userDays.forEach(async day => {
      await ctx.prisma.day.delete({
        where: {
          id: day.id
        }
      })
    })
  })
})
