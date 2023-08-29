import * as Dialog from "@radix-ui/react-dialog"

type WeekResetModalProps = {
  userHasWeeks: boolean
}

export const WeekResetModal = ({ userHasWeeks }: WeekResetModalProps) => {
  function createNewActivities() {}

  function repeatActivities() {}

  return (
    <Dialog.Root open={true}>
      <Dialog.Overlay className="fixed inset-0 z-40 grid h-screen w-screen place-items-center bg-black/20 data-[state=closed]:animate-[overlayHide_100ms] data-[state=open]:animate-[overlayShow_150ms]">
        <Dialog.Content className="-sm:max-w-[calc(100vw-40px)] container z-50 flex max-w-md flex-col items-center justify-center gap-9 rounded-xl bg-neutral-900 p-4 text-white outline-none data-[state=closed]:animate-[contentHide_100ms] data-[state=open]:animate-[contentShow_150ms]">
          <Dialog.Title className="mt-auto flex max-w-[22ch] text-center text-3xl font-bold">
            {userHasWeeks
              ? "Would you like to repeat last week's activities?"
              : "Would you like to create new activities for this week?"}
          </Dialog.Title>
          <div className="mt-auto flex w-full flex-col items-center gap-3 font-semibold">
            <button
              data-user-has-weeks={userHasWeeks}
              onClick={createNewActivities}
              className="flex w-full items-center justify-center rounded bg-neutral-800 py-2 outline-none transition-colors data-[user-has-weeks=false]:bg-violet-600 data-[user-has-weeks=false]:hover:bg-violet-700"
            >
              Create New Activities
            </button>
            {userHasWeeks && (
              <button
                onClick={repeatActivities}
                className="flex w-full items-center justify-center rounded bg-violet-600 py-2 outline-none transition-colors hover:bg-violet-700"
              >
                Repeat Activities
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  )
}
