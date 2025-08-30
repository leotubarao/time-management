import { legacy_createStore } from "redux"
import { persistStore, persistReducer, type PersistConfig } from "redux-persist"
import storage from 'redux-persist/lib/storage'

import type { RootState } from "@/types"

import { rootReducer } from './reducers'

const persistConfig: PersistConfig<RootState> = {
  key: '@TimeManagement::values',
  storage,
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer as any)

const store = legacy_createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }