import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

export const daysRouter = createTRPCRouter({
  resetWeek: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.day.deleteMany({
      where: {
        userId: ctx.session.user.id
      }
    })
  }),
  getWeekResetEligibility: protectedProcedure.query(async ({ ctx }) => {
    const userDays = await ctx.prisma.day.findMany({
      where: {
        userId: ctx.session.user.id
      }
    })

    let resetEligible = false
    if (userDays.length === 0) {
      return true
    }

    userDays.map(day => {
      if (day.value === "Sunday") {
        const today = new Date()
        const timeDiff = day.createdAt.getTime() - today.getTime()
        if (timeDiff > 0) {
          resetEligible = true
        }
      }
    })

    return resetEligible
  }),
  getUserDays: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.day.findMany({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        dayFields: true
      }
    })
  }),
  createWeeklyRoutine: protectedProcedure.mutation(async ({ ctx }) => {
    const userDays = await ctx.prisma.day.findMany({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        dayFields: true
      }
    })

    if (userDays.length > 0) {
      await ctx.prisma.day.deleteMany({
        where: {
          userId: ctx.session.user.id
        }
      })
    } else {
      return await ctx.prisma.day.createMany({
        data: [
          {
            userId: ctx.session.user.id,
            value: "Sunday"
          },
          {
            userId: ctx.session.user.id,
            value: "Monday"
          },
          {
            userId: ctx.session.user.id,
            value: "Tuesday"
          },
          {
            userId: ctx.session.user.id,
            value: "Wednesday"
          },
          {
            userId: ctx.session.user.id,
            value: "Thursday"
          },
          {
            userId: ctx.session.user.id,
            value: "Friday"
          },
          {
            userId: ctx.session.user.id,
            value: "Saturday"
          }
        ]
      })
    }
  }),
  createDayfield: protectedProcedure
    .input(
      z.object({
        dayId: z.string(),
        value: z.string(),
        observation: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.dayField.create({
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
