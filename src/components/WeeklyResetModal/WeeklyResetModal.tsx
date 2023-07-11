import * as Dialog from "@radix-ui/react-dialog"
import { useSession } from "next-auth/react"
import { api } from "~/utils/api"

interface ModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const WeeklyResetModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const daysReset = api.days.createWeeklyRoutine.useMutation()
  const { data: session } = useSession()
  const { data: userDays } = api.days.getUserDays.useQuery(undefined, {
    enabled: !!session?.user.id
  })

  function handleResetDayFields() {
    setIsOpen(false)
    if (session?.user.id) {
      daysReset.mutate()
    }
  }

  function handleKeepDayFields() {
    setIsOpen(false)
  }

  if (!userDays?.length) return null

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Overlay className="fixed inset-0 z-40 grid h-screen w-screen place-items-center bg-black/20 data-[state=closed]:animate-[overlayHide_100ms] data-[state=open]:animate-[overlayShow_150ms]">
        <Dialog.Content className="container z-50 flex max-w-md flex-col items-center justify-center gap-9 rounded-xl bg-neutral-900 p-4 text-white outline-none data-[state=closed]:animate-[contentHide_100ms] data-[state=open]:animate-[contentShow_150ms] -sm:max-w-[calc(100vw-40px)]">
          <Dialog.Title className="mt-auto flex max-w-[22ch] text-center text-3xl font-bold">
            Would you like to repeat last week's activities?
          </Dialog.Title>
          <div className="mt-auto flex w-full flex-col items-center gap-3 font-semibold">
            <button
              onClick={handleResetDayFields}
              className="flex w-full items-center justify-center rounded bg-neutral-800 py-2 outline-none transition-colors">
              Create New Activities
            </button>
            <button
              onClick={handleKeepDayFields}
              className="flex w-full items-center justify-center rounded bg-violet-600 py-2 outline-none transition-colors hover:bg-violet-700">
              Repeat Activities
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  )
}
