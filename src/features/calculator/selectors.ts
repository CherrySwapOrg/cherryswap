import { createSelector } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import type { AppState } from 'app/store'
import { FlowType } from 'types/exchange'

export const selectExchangeAmounts = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ amounts: { from, to, minAmount, maxAmount } }) => ({ fromAmount: from, toAmount: to, minAmount, maxAmount }),
)

export const selectExchangeCurrencies = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ currencies: { from, to } }) => ({ fromCurrency: from, toCurrency: to }),
)

export const selectExchangeAddresses = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ addresses }) => addresses,
)

export const selectCurrenciesInfo = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ currenciesInfo }) => currenciesInfo,
)

export const selectCurrencyInfo = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState, currencyKey: string) => currencyKey,
  ({ currenciesInfo }, currencyKey) => currenciesInfo[currencyKey],
)

export const selectCalculatorUiState = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ ui }) => ui,
)

export const selectArrivalTime = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ estimatedArrivalTime }) => estimatedArrivalTime,
)

export const selectEstimatedRate = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ estimatedRate }) => estimatedRate,
)

export const selectIsFixedRate = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ flowInfo }) => flowInfo.flow === FlowType.FixedRate,
)

export const selectExchangeType = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ flowInfo }) => flowInfo.type,
)

export const selectExchangeFixedRateId = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ flowInfo }) => flowInfo.rateId,
)

export const selectExchangeError = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState) => _,
  ({ errorMessage }) => ({
    errorMessage,
  }),
)

export const selectTimerInfoFromTimestamp = createSelector(
  (state: AppState) => state.calculator,
  (_: AppState, nowTimestamp: dayjs.Dayjs) => nowTimestamp,
  ({ flowInfo: { validUntil } }) => {
    if (validUntil) {
      const seconds = dayjs(validUntil).diff(dayjs(), 'second')

      return {
        displayDate: dayjs.duration(dayjs(validUntil).diff(dayjs())).format('mm:ss'),
        duration: seconds,
      }
    }

    return {
      displayDate: '',
      duration: -1,
    }
  },
)
