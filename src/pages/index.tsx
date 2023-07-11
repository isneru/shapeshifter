import { signIn, signOut, useSession } from "next-auth/react"
import { Layout } from "~/components"
import { api } from "~/utils/api"

export default function Home() {
  const { data: session } = useSession()
  const { data: userDays } = api.days.getUserDays.useQuery(undefined, {
    enabled: !!session?.user.id
  })

  const daysReset = api.days.createWeeklyRoutine.useMutation()

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <button onClick={() => (session ? signOut() : signIn("google"))}>
          {session ? "Sign out" : "Sign in"}
        </button>
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
      </main>
    </Layout>
  )
}
