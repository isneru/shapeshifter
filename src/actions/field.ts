"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createField(
  dayId: string,
  value: string,
  observation?: string
) {
  await prisma.field.create({
    data: {
      dayId,
      value,
      observation: !!observation ? observation : undefined
    }
  })

  revalidatePath("/")
}
