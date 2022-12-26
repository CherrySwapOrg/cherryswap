import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { calculatorReducer } from 'features/calculator/calculator-slice'
import { exchangeStatusReducer } from 'features/exchange-status/exchange-status-slice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['calculator', 'exchangeStatus'],
}

const calculatorPersistConfig = {
  key: 'calculator',
  storage,
  whitelist: ['currencies', 'amounts', 'flowInfo'],
}

const rootReducer = combineReducers({
  calculator: persistReducer(calculatorPersistConfig, calculatorReducer),
  exchangeStatus: exchangeStatusReducer,
})

const store = configureStore({ reducer: persistReducer(persistConfig, rootReducer) })
export const persistor = persistStore(store)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export default store
