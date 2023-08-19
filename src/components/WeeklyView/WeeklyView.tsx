import { ChangeEvent, KeyboardEvent, useState } from "react"
import { RouterOutputs, api } from "~/utils/api"
import { weekHelper } from "~/utils/week"

interface WeeklyViewProps {
  week: RouterOutputs["weeks"]["getUserWeek"] | undefined
}

export const WeeklyView = ({ week }: WeeklyViewProps) => {
  const [fields, setFields] = useState(
    Array.from({ length: 7 }, () => ({ isEditing: false, value: "", obs: "" }))
  )

  const daysUpdate = api.weeks.createField.useMutation()

  function toggleField(dayIdx: number) {
    setFields(prevState => {
      return prevState.map((field, idx) => {
        return idx === dayIdx
          ? { ...field, isEditing: !field.isEditing }
          : { ...field, isEditing: false }
      })
    })
  }

  function handleInputValueChange(
    e: ChangeEvent<HTMLInputElement>,
    dayIdx: number
  ) {
    setFields(prevState => {
      return prevState.map((field, idx) => {
        return idx === dayIdx ? { ...field, value: e.target.value } : field
      })
    })
  }

  function handleInputObsChange(
    e: ChangeEvent<HTMLInputElement>,
    dayIdx: number
  ) {
    setFields(prevState => {
      return prevState.map((field, idx) => {
        return idx === dayIdx ? { ...field, obs: e.target.value } : field
      })
    })
  }

  function handleInputKeyDown(
    e: KeyboardEvent<HTMLInputElement>,
    dayIdx: number
  ) {
    if (e.key !== "Enter" || !week) return

    daysUpdate.mutate({
      dayId: week!.days[dayIdx]!.id,
      value: fields[dayIdx]!.value,
      observation: fields[dayIdx]!.obs
    })
  }

  if (!week || !week.days.length) return null

  return (
    <div className="grid w-full grid-cols-1 gap-4 overflow-x-auto p-4 lg:grid-cols-7">
      {week.days.map((day, idx) => (
        <div>
          <span className="mb-2 inline-flex w-full items-center justify-center font-semibold lg:justify-start">
            {weekHelper[idx]}
          </span>
          <div
            key={day.id}
            className="group/item flex aspect-video flex-col gap-2 rounded-lg bg-white/5 p-2"></div>
        </div>
      ))}
    </div>
  )
}
