import { AuthButton } from "@/components/client"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <nav className="flex items-center gap-4 bg-neutral-800 p-6">
      <AuthButton
        className="inline-flex items-center gap-4"
        isAuthed={!!session}
      >
        {!!session ? "Sign out" : "Sign in"}
        {session?.user.image && (
          <img
            src={session.user.image}
            className="h-8 w-8 rounded-full"
            alt=""
          />
        )}
      </AuthButton>
    </nav>
  )
}
