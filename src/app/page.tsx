import { WeekBoard } from "@/components/client"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const foundUser = await prisma.user.findUnique({
    where: {
      id: session?.user.id
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

  return (
    <div className="grid h-screen grid-rows-[7] gap-4 px-8 py-6 xl:grid-cols-7 xl:grid-rows-1">
      <WeekBoard lastWeek={lastWeek} />
    </div>
  )
}
