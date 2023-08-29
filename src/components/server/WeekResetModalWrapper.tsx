import { WeekResetModal } from "@/components/client"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"

export const WeekResetModalWrapper = async () => {
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

  return <WeekResetModal userHasWeeks={foundUser.weeks.length > 1} />
}
