import type { Time } from '@/types'
import { useDispatch } from 'react-redux'

export const useActionTimes = () => {
  const dispatch = useDispatch()

  const addTime = (dateRange: Time.DateRange) =>
    dispatch({ type: 'ADD_TIME', payload: { dateRange } })

  const deleteTime = (currentTimeId: string) =>
    dispatch({ type: 'DELETE_TIME', payload: { id: currentTimeId } })

  return { addTime, deleteTime }
}
