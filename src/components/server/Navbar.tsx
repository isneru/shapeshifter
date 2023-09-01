import { AuthButton } from "@/components/client"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Image from "next/image"

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
          <Image
            className="h-8 w-8 rounded-full"
            src={session.user.image}
            alt={session.user.name!}
            width={32}
            height={32}
          />
        )}
      </AuthButton>
    </nav>
  )
}
