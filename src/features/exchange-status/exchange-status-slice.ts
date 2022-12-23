import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import type { AppState } from 'app/store'
import { ChangeNowExchange } from 'features/exchange-status/types'

const initialState: ChangeNowExchange = {
  payinAddress: undefined,
  payoutAddress: undefined,
  payinExtraId: undefined,
  fromCurrency: undefined,
  toCurrency: undefined,
  id: undefined,
  expectedAmountFrom: undefined,
  expectedAmountTo: undefined,
  status: undefined,
  validUntil: undefined,
  isExpiredExchange: false,
}

export const exchangeStatusSlice = createSlice({
  name: 'exchangeStatus',
  initialState,
  reducers: {
    setExchangeInfo: (state, action: PayloadAction<ChangeNowExchange>) => {
      const isExpiredExchange = action.payload.validUntil
        ? dayjs(action.payload.validUntil).diff(dayjs(), 'second') < 0
        : false

      return { ...action.payload, isExpiredExchange }
    },
    resetExchangeStatusInfo: () => initialState,
  },
})

export const { setExchangeInfo, resetExchangeStatusInfo } = exchangeStatusSlice.actions

export const exchangeStatusReducer = exchangeStatusSlice.reducer

export const selectTimerInfoForExchangeStatus = createSelector(
  (state: AppState) => state.exchangeStatus,
  (_: AppState, nowTimestamp: dayjs.Dayjs) => nowTimestamp,
  ({ validUntil, createdAt }) => {
    if (validUntil) {
      const seconds = dayjs(validUntil).diff(dayjs(), 'second')
      const totalTime = dayjs(validUntil).diff(dayjs(createdAt), 'second')

      return {
        displayDate: dayjs.duration(dayjs(validUntil).diff(dayjs())).format('mm:ss'),
        duration: seconds,
        totalTime,
      }
    }

    return {
      displayDate: '',
      duration: -1,
    }
  },
)

export const selectExchangeStatusInfo = createSelector(
  (state: AppState) => state,
  (_: AppState) => _,
  ({ exchangeStatus }) => exchangeStatus,
)
