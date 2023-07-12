import { Edit } from "lucide-react"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { RouterOutputs, api } from "~/utils/api"

interface WeeklyViewProps {
  userDays: RouterOutputs["days"]["getUserDays"] | undefined
}

export const WeeklyView = ({ userDays }: WeeklyViewProps) => {
  const [fields, setFields] = useState(
    Array.from({ length: 7 }, () => ({ isEditing: false, value: "", obs: "" }))
  )

  const daysUpdate = api.days.createDayfield.useMutation()

  function toggleIsAddingField(dayIdx: number) {
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
    if (e.key !== "Enter" || !userDays) return

    daysUpdate.mutate({
      dayId: userDays![dayIdx]!.id,
      value: fields[dayIdx]!.value,
      observation: fields[dayIdx]!.obs
    })
  }

  return userDays?.length ? (
    <div className="grid grid-cols-7 gap-4 overflow-x-auto">
      {userDays.map((day, idx) => (
        <div
          key={day.id}
          className="group/item flex flex-col gap-2 rounded-lg bg-white/5 p-2">
          <span className="inline-flex items-center font-semibold">
            {day.value}
            <button
              onClick={() => toggleIsAddingField(idx)}
              className="group/color ml-auto flex">
              <Edit
                className="opacity-0 transition-colors group-hover/color:text-violet-500 group-hover/item:opacity-100"
                strokeWidth={2}
              />
            </button>
          </span>
          {fields[idx]!.isEditing && (
            <>
              <input
                autoFocus
                placeholder="Title"
                className="rounded bg-neutral-900 p-1 outline-none"
                type="text"
                value={fields[idx]?.value}
                onChange={e => handleInputValueChange(e, idx)}
              />
              <input
                onKeyDown={e => handleInputKeyDown(e, idx)}
                placeholder="Observation"
                className="rounded bg-neutral-900 p-1 outline-none"
                type="text"
                value={fields[idx]?.obs}
                onChange={e => handleInputObsChange(e, idx)}
              />
            </>
          )}
          {day.dayFields.map(field => (
            <div
              key={field.id}
              className="flex flex-col gap-1 rounded-lg bg-neutral-900 p-2">
              <span className="font-semibold">{field.value}</span>
              <span className="text-sm">{field.observation}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : null
}
