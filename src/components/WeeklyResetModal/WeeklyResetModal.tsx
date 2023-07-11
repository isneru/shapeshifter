import * as Dialog from "@radix-ui/react-dialog"
import { useSession } from "next-auth/react"
import { api } from "~/utils/api"

interface ModalProps {
  isOpen: boolean
  setIsOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const WeeklyResetModal = ({ isOpen, setIsOpenChange }: ModalProps) => {
  const { data: session } = useSession()
  const dayFieldsReset = api.dayFields.resetWeek.useMutation()

  function handleResetDayFields() {
    dayFieldsReset.mutate({ userId: session?.user.id! })
    setIsOpenChange(false)
  }

  function handleKeepDayFields() {
    setIsOpenChange(false)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpenChange}>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/20 data-[state=closed]:animate-[overlayHide_100ms] data-[state=open]:animate-[overlayShow_150ms]" />
      <Dialog.Content className="container z-50 flex max-w-md flex-col items-center justify-center gap-9 rounded-xl bg-neutral-900 p-4 text-white outline-none data-[state=closed]:animate-[contentHide_100ms] data-[state=open]:animate-[contentShow_150ms] -sm:max-w-[calc(100vw-40px)]">
        <Dialog.Title className="mt-auto flex max-w-[22ch] text-center text-3xl font-bold">
          Would you like to repeat last week's activities?
        </Dialog.Title>
        <div className="mt-auto flex w-full flex-col items-center gap-3">
          <button
            onClick={handleResetDayFields}
            className="flex w-full items-center justify-center rounded bg-neutral-800 py-2 outline-none transition-colors">
            No
          </button>
          <button
            onClick={handleKeepDayFields}
            className="flex w-full items-center justify-center rounded bg-violet-600 py-2 outline-none transition-colors hover:bg-violet-700">
            Yes
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
