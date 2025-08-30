import { differenceInMinutes, format } from 'date-fns'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { Time } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date): string => format(date, 'dd/MM/yyyy HH:mm')

export const paddedNumber = (value: number): string => String(value).padStart(2, '0')

export const isEndTimeAfterStartTime = (endTime: Date, startTime: Date): boolean => {
  if (!endTime || !startTime) return true

  return endTime.getTime() > startTime.getTime()
}

export const separateTimes = (endTime: Date, startTime: Date): number[] => {
  const totalTime = differenceInMinutes(endTime, startTime)
  const hours = Math.floor(totalTime / 60)
  const minutes = totalTime % 60
  
  return [hours, minutes]
}

export const totalHoursWorked = (times: Time.State) => (
  times.reduce((total, time) => {
    const totalMinutes = differenceInMinutes(time.dateRange.end, time.dateRange.start)

    return total + totalMinutes
  }, 0)
)

export const formatTime = (totalTime: number): string => {
  const hours = paddedNumber(Math.floor(totalTime / 60))
  const remainingMinutes = paddedNumber(totalTime % 60)

  return [hours, remainingMinutes].join(':')
}

export const formatHours = (endTime: Date, startTime: Date): string => {
  const [hours, minutes] = separateTimes(endTime, startTime)

  return [paddedNumber(hours), paddedNumber(minutes)].join(':')
}

export const calculateTotalHours = (times: Time.State): string => {
  const totalMinutes = totalHoursWorked(times)

  return formatTime(totalMinutes)
}
