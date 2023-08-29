import { AuthButton } from "@/components/client"
import { WeekResetModalWrapper } from "@/components/server"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center gap-6">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <AuthButton isAuthed={!!session}>
        {!!session ? "Sign out" : "Sign in"}
      </AuthButton>
      <WeekResetModalWrapper />
    </main>
  )
}
