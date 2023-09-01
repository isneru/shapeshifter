import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function isDateInSameWeek(date: Date) {
  const today = new Date()
  const todayDate = today.getDate()
  const todayDay = today.getDay()

  const firstDayOfWeek = new Date(today.setDate(todayDate - todayDay))
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1)
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)

  return firstDayOfWeek < date && date < lastDayOfWeek
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
