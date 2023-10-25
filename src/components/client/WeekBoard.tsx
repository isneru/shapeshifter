import { TooltipPopover } from "@/components/client"
import { weekDays } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons"

type WeekBoardProps = {
  lastWeek: {
    days: {
      id: string
      userId: string
      createdAt: Date
      updatedAt: Date
      weekId: string
    }[]
  } & {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
  }
}

export const WeekBoard = ({ lastWeek }: WeekBoardProps) => {
  return (
    <div className="grid h-screen grid-rows-[7] gap-4 p-6 xl:grid-cols-7 xl:grid-rows-1">
      {lastWeek.days.map((day, i) => (
        <div
          key={day.id}
          className="min-h-[30vh] rounded-lg border-[0.5px] border-white/20 bg-neutral-950 bg-[url(/noise.svg)] xl:min-h-0"
        >
          <div className="flex w-full items-center justify-between rounded-t-lg bg-neutral-950 p-3">
            <strong>{weekDays[i]}</strong>
            <TooltipPopover label="Add a Field" side="bottom">
              <button className="rounded transition-colors hover:bg-neutral-700">
                <PlusIcon className="h-6 w-6" />
              </button>
            </TooltipPopover>
          </div>
        </div>
      ))}
    </div>
  )
}
