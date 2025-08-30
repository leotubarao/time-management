import { v4 as uuidv4 } from 'uuid'

import type { Action, Time } from '@/types'

const initialState: Time.State = []

export const timesReducer = (
  state = initialState,
  action: Action<Time.Type, Time.Item>,
): Time.State => {
  if (!action.payload) return state

  const { dateRange, id: actionTimeId } = action.payload

  switch (action.type) {
    case 'ADD_TIME':
      return [...state, { id: uuidv4(), dateRange }] as Time.State

    case 'DELETE_TIME':
      return state.filter(({ id: currentId }: Time.Item) => currentId !== actionTimeId)

    default:
      return state
  }
}
