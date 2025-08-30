import { combineReducers } from "redux"

import { timesReducer } from "./times"

export const rootReducer = combineReducers({
  times: timesReducer,
})
