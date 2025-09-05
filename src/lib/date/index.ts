import { differenceInMinutes, format } from 'date-fns'

import type { Time } from '@/types'

/** Formatar data para o formato "dd/MM/yyyy HH:mm"
 * @param date Data a ser formatada
 * @returns Data formatada
 */
export const formatDate = (date: Date, full?: boolean): string => {
  if (full) return format(date, 'dd/MM/yyyy HH:mm')

  return format(date, 'dd/MM/yyyy')
}

/** Formatar hora para o formato "HH:mm"
 * @param date Data a ser formatada
 * @returns Hora formatada
 */
export const formatTime = (date: Date): string => format(date, 'HH:mm')

/** Adicionar zero à esquerda em números menores que 10
 * @param value Número a ser formatado
 * @returns Número formatado com dois dígitos
 */
export const paddedNumber = (value: number): string => String(value).padStart(2, '0')

/** Verificar se a data de término é maior que a data de início
 * @param endTime Data de término
 * @param startTime Data de início
 * @returns true se a data de término for maior que a data de início, caso contrário, false
 */
export const isEndTimeAfterStartTime = (endTime: Date, startTime: Date): boolean => {
  if (!endTime || !startTime) return true

  return endTime.getTime() > startTime.getTime()
}

/**
 * Separar o tempo total em horas e minutos
 * @param endTime Data de término
 * @param startTime Data de início
 * @returns Array com horas e minutos separados
 */
export const separateTimes = (endTime: Date, startTime: Date): number[] => {
  const totalTime = differenceInMinutes(endTime, startTime)
  const hours = Math.floor(totalTime / 60)
  const minutes = totalTime % 60
  
  return [hours, minutes]
}

/**
 * Calcular o total de tempo em minutos a partir de um array de registros de tempo
 * @param times Array de registros de tempo
 * @returns Total de tempo em minutos
 */
export const totalHoursWorked = (times: Time.State) => (
  times.reduce((total, time) => {
    const totalMinutes = differenceInMinutes(time.dateRange.end, time.dateRange.start)

    return total + totalMinutes
  }, 0)
)

/**
 * 
 * @param totalTime Total de tempo em minutos
 * @returns Horas no formato "HH:mm"
 */
export const formatTimeByMinutes = (totalTime: number): string => {
  const hours = paddedNumber(Math.floor(totalTime / 60))
  const remainingMinutes = paddedNumber(totalTime % 60)

  return [hours, remainingMinutes].join(':')
}

/**
 * Formatar duas datas e retornar as horas trabalhadas no formato "HH:mm"
 * @param endTime Data de término
 * @param startTime Data de início
 * @returns Horas trabalhadas no formato "HH:mm"
 */
export const formatHours = (endTime: Date, startTime: Date): string => {
  const [hours, minutes] = separateTimes(endTime, startTime)

  return [paddedNumber(hours), paddedNumber(minutes)].join(':')
}

/**
 * Calcular o total de horas trabalhadas em um array de registros de tempo
 * @param times Array de registros de tempo
 * @returns Total de horas trabalhadas no formato "HH:mm"
 */
export const calculateTotalHours = (times: Time.State): string => {
  const totalMinutes = totalHoursWorked(times)

  return formatTimeByMinutes(totalMinutes)
}
