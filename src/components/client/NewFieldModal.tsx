import { createField } from "@/actions"
import * as Dialog from "@radix-ui/react-dialog"
import { Dispatch, SetStateAction, useState } from "react"

type NewFieldModalProps = {
  dayId: string
  setIsAdding: Dispatch<SetStateAction<string | undefined>>
}

export const NewFieldModal = ({ dayId, setIsAdding }: NewFieldModalProps) => {
  const [value, setValue] = useState("")
  const [observation, setObservation] = useState("")
  const [_, setIsOpen] = useState(false)

  return (
    <Dialog.Root
      defaultOpen
      onOpenChange={(val) => {
        setIsOpen(val)
        setValue("")
        setObservation("")
        setIsAdding(undefined)
      }}
    >
      <Dialog.Overlay className="fixed inset-0 z-40 grid h-screen w-screen place-items-center bg-black/20 data-[state=closed]:animate-[overlayHide_100ms] data-[state=open]:animate-[overlayShow_150ms]">
        <Dialog.Content className="-sm:max-w-[calc(100vw-40px)] container z-50 flex max-w-md flex-col items-center justify-center gap-9 rounded-xl bg-neutral-900 p-4 text-xl text-white outline-none data-[state=closed]:animate-[contentHide_100ms] data-[state=open]:animate-[contentShow_150ms]">
          <div className="mt-auto flex w-full flex-col gap-4 text-center font-medium">
            <input
              placeholder="Anything!"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              name="value"
              className="w-full rounded border-[0.5px] border-white/20 bg-neutral-800 p-2 outline-none transition-all placeholder:text-neutral-300"
            />
            <input
              placeholder="observation (optional)"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              type="text"
              name="observation"
              className="w-full rounded border-[0.5px]  border-white/20 bg-neutral-800 p-2 outline-none transition-all placeholder:text-neutral-300"
            />
          </div>
          <div className="mt-auto flex w-full flex-col items-center gap-3 font-semibold">
            <button
              onClick={() => createField(dayId, value, observation)}
              className="flex w-full items-center justify-center rounded bg-violet-600 py-2 outline-none transition-colors hover:bg-violet-700"
            >
              Create new field
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  )
}
