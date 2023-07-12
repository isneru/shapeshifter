import { useSession } from "next-auth/react"
import { Layout, WeeklyView } from "~/components"
import { api } from "~/utils/api"

export default function Home() {
  const { data: session, status } = useSession()
  const { data: userDays, isLoading } = api.days.getUserDays.useQuery(
    undefined,
    {
      enabled: !!session?.user.id
    }
  )

  const daysReset = api.days.createWeeklyRoutine.useMutation()

  return (
    <Layout isLoading={isLoading || status === "loading"}>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!userDays?.length && session && (
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold sm:text-3xl">
              You still don't have a weekly routine.
            </p>
            <button
              onClick={() => daysReset.mutate()}
              className="rounded bg-violet-600 py-2 text-xl font-semibold hover:bg-violet-700">
              Create routine
            </button>
          </div>
        )}
        <WeeklyView userDays={userDays} />
      </main>
    </Layout>
  )
}
