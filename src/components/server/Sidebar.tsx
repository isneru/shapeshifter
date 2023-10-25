import { AuthButton, TooltipPopover } from "@/components/client"
import { authOptions } from "@/lib/auth"
import { EnterIcon, ExitIcon, PlusIcon } from "@radix-ui/react-icons"
import { Session, getServerSession } from "next-auth"

export const Sidebar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <nav className="flex h-screen min-w-[40px] max-w-[40px] flex-col items-center bg-neutral-800 p-2">
      <AuthButton
        hasPopover
        className="mt-auto flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-neutral-700"
        isAuthed={!!session}
      >
        {!!session ? (
          <ExitIcon className="h-5 w-5" />
        ) : (
          <EnterIcon className="h-5 w-5" />
        )}
      </AuthButton>
    </nav>
  )
}
