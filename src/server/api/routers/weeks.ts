import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

export const weeksRouter = createTRPCRouter({
  resetWeek: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.day.deleteMany({
      where: {
        userId: ctx.session.user.id
      }
    })
  }),
  getWeekResetEligibility: protectedProcedure.query(async ({ ctx }) => {
    const userWeek = await ctx.prisma.week.findFirst({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        days: true
      }
    })

    if (!userWeek || userWeek.days.length === 0) return true

    const timeDiff = userWeek.updatedAt.getTime() - new Date().getTime()

    if (timeDiff > 0) return false
  }),
  getUserWeek: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.week.findFirst({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        days: {
          include: {
            fields: true
          }
        }
      }
    })
  }),
  createWeek: protectedProcedure.mutation(async ({ ctx }) => {
    const userWeek = await ctx.prisma.week.findFirst({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        days: true
      }
    })

    if (!userWeek) {
      return await ctx.prisma.week.create({
        data: {
          userId: ctx.session.user.id,
          days: {
            createMany: {
              data: new Array(7).fill({
                userId: ctx.session.user.id
              })
            }
          }
        }
      })
    } else {
      return await ctx.prisma.week.update({
        where: {
          id: userWeek.id
        },
        data: {
          days: {
            updateMany: {
              where: {
                userId: ctx.session.user.id
              },
              data: new Array(7).fill({
                userId: ctx.session.user.id
              })
            }
          }
        }
      })
    }
  }),
  createField: protectedProcedure
    .input(
      z.object({
        dayId: z.string(),
        value: z.string(),
        observation: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.field.create({
        data: {
          value: input.value,
          observation: input.observation,
          day: {
            connect: {
              id: input.dayId
            }
          }
        }
      })
    })
})
