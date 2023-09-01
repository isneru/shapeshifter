"use server"

import { prisma } from "@/lib/db"

export async function createNewWeek(userId: string) {
  await prisma.week.create({
    data: {
      userId
    }
  })
}

export async function repeatWeek(userId: string) {
  const foundUserWeeks = await prisma.week.findMany({
    where: {
      userId
    },
    orderBy: {
      id: "asc"
    },
    include: {
      days: {
        include: {
          fields: true
        }
      }
    }
  })

  if (foundUserWeeks.length < 1) return

  const lastWeek = foundUserWeeks[foundUserWeeks.length - 1]

  const newWeek = await prisma.week.create({
    data: {
      userId,
      days: {
        createMany: {
          data: lastWeek.days.map((day) => ({
            userId
          }))
        }
      }
    }
  })
}
