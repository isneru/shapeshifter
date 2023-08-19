import { useSession } from "next-auth/react"
import { Layout, WeeklyView } from "~/components"
import { api } from "~/utils/api"

export default function Home() {
  const { data: session } = useSession()
  const { data: userWeek } = api.weeks.getUserWeek.useQuery(undefined, {
    enabled: !!session?.user.id
  })

  const { mutate: confirmReset } = api.weeks.createWeek.useMutation()

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center">
        {!userWeek?.days?.length && session && (
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold sm:text-3xl">
              You still don't have a weekly routine.
            </p>
            <button
              onClick={() => confirmReset()}
              className="rounded bg-violet-600 py-2 text-xl font-semibold hover:bg-violet-700">
              Create routine
            </button>
          </div>
        )}
        <WeeklyView week={userWeek} />
      </main>
    </Layout>
  )
}
