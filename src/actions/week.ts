"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createNewWeek(userId: string) {
  await prisma.week.create({
    data: {
      userId,
      days: {
        createMany: {
          data: new Array(7).fill({ userId })
        }
      }
    }
  })

  revalidatePath("/")
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

  await prisma.week.create({
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

  revalidatePath("/")
}
