import { WeekResetModal } from "@/components/client"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { isDateInSameWeek } from "@/lib/utils"
import { getServerSession } from "next-auth"

export const WeekResetModalContainer = async () => {
  const session = await getServerSession(authOptions)

  if (!session) return <></>

  const foundUser = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    include: {
      weeks: true
    }
  })

  if (!foundUser) return <></>

  if (foundUser.weeks.length > 0) {
    const userLastWeek = foundUser.weeks[foundUser.weeks.length - 1]

    if (isDateInSameWeek(userLastWeek.createdAt)) return <></>
  }

  return (
    <WeekResetModal
      userId={session.user.id}
      userHasWeeks={foundUser.weeks.length > 0}
    />
  )
}
