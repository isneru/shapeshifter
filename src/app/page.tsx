import { WeekBoard } from "@/components/client"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) return <></>

  const foundUser = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    include: {
      weeks: {
        include: {
          days: true
        }
      }
    }
  })

  if (!foundUser) return <></>

  const lastWeek = foundUser.weeks[foundUser.weeks.length - 1] ?? null

  if (!lastWeek) return <></>

  return <WeekBoard lastWeek={lastWeek} />
}
