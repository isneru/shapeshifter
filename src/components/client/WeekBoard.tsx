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

export const WeekBoard = ({ lastWeek }: WeekBoardProps) =>
  lastWeek.days.map((day, i) => (
    <div
      key={day.id}
      className="rounded-lg border-[0.5px] border-white/20 bg-neutral-950 px-1 py-2"
    >
      <div className="flex w-full items-center justify-between px-2 py-1">
        <strong>{weekDays[i]}</strong>
        <TooltipPopover label="Add a Field" side="bottom">
          <button className="rounded transition-colors hover:bg-neutral-700">
            <PlusIcon className="h-6 w-6" />
          </button>
        </TooltipPopover>
      </div>
    </div>
  ))
