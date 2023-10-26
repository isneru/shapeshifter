import { NewFieldModal, TooltipPopover } from "@/components/client"
import { getWeekDays } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"

type WeekBoardProps = {
  lastWeek: {
    days: {
      id: string
      userId: string
      createdAt: Date
      updatedAt: Date
      weekId: string
      fields: {
        id: string
        value: string
        observation: string | null
        dayId: string
        createdAt: Date
        updatedAt: Date
      }[]
    }[]
  } & {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
  }
  weekStartsMonday: boolean
}

export const WeekBoard = ({ lastWeek, weekStartsMonday }: WeekBoardProps) => {
  const [isAdding, setIsAdding] = useState<undefined | string>(undefined)

  return (
    <div className="grid h-screen grid-rows-[7] gap-4 p-6 xl:grid-cols-7 xl:grid-rows-1">
      {lastWeek.days.map((day, i) => (
        <div
          key={day.id}
          className="flex min-h-[30vh] flex-col gap-2 rounded-lg border-[0.5px] border-white/20 bg-neutral-950 xl:min-h-0"
        >
          <div className="flex w-full items-center justify-between rounded-t-lg border-b-[0.5px] border-white/10 p-3">
            <strong>{getWeekDays(weekStartsMonday)[i]}</strong>
            <TooltipPopover label="Add a Field" side="bottom">
              <button
                onClick={() => setIsAdding(day.id)}
                className="rounded transition-colors hover:bg-neutral-700"
              >
                <PlusIcon className="h-6 w-6" />
              </button>
            </TooltipPopover>
          </div>
          {day.fields.map((field, i) => (
            <div
              key={i}
              className="mx-3 rounded bg-neutral-900 p-2 transition-colors hover:bg-neutral-800"
            >
              <p className="text-lg font-semibold">{field.value}</p>
              {field.observation && (
                <span className="text-neutral-300">{field.observation}</span>
              )}
            </div>
          ))}
          {isAdding === day.id && (
            <NewFieldModal setIsAdding={setIsAdding} dayId={day.id} />
          )}
        </div>
      ))}
    </div>
  )
}
