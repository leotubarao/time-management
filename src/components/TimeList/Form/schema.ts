import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEndTimeAfterStartTime } from '@/lib/utils'

export const timeSchema = z.object({
  startTime: z.date(),
  endTime: z.date(),
}).refine(
  (data) => isEndTimeAfterStartTime(data.endTime, data.startTime),
  {
    message: 'O horário de término deve ser maior que o início',
    path: ['endTime'],
  }
)

export const timeFormResolver = zodResolver(timeSchema)

export type TimeFormData = z.infer<typeof timeSchema>
