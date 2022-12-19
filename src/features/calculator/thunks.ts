import { createAsyncThunk } from '@reduxjs/toolkit'

import type { AppState } from 'app/store'
import { getCurrenciesInfo, getEstimatedAmount, sendExchangeInfo } from 'features/calculator/client'
import {
  selectCurrencyInfo,
  selectExchangeAddresses,
  selectExchangeAmounts,
  selectExchangeCurrencies,
} from 'features/calculator/selectors'
import { CurrencyInfo, GetEstimatedAmountResponse } from 'features/calculator/types'
import createDebouncedAsyncThunk from 'features/create-debounced-async-thunk'
import { setExchangeInfo } from 'features/exchange-status/exchange-status-slice'
import { ExchangeType, FlowType } from 'types/exchange'

export const getCurrencyInfo = createAsyncThunk<{ currenciesInfo: Record<string, CurrencyInfo> }>(
  'calculator/getCurrencyInfo',
  async () => {
    const currenciesInfo = await getCurrenciesInfo()

    return {
      currenciesInfo,
    }
  },
)

export const sendExchange = createAsyncThunk('calculator/sendExchangeData', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState

  const { dispatch } = thunkAPI

  const { fromAmount, toAmount } = selectExchangeAmounts(state)
  const { fromCurrency, toCurrency } = selectExchangeCurrencies(state)
  const { toAddress, refundAddress } = selectExchangeAddresses(state)

  const toCurrencyInfo = selectCurrencyInfo(state, toCurrency)
  const fromCurrencyInfo = selectCurrencyInfo(state, fromCurrency)

  if (fromAmount) {
    const exchangeInfo = await sendExchangeInfo({
      address: toAddress,
      fromAmount,
      fromCurrency: fromCurrencyInfo.ticker,
      fromNetwork: fromCurrencyInfo.network,
      toCurrency: toCurrencyInfo?.ticker,
      toNetwork: toCurrencyInfo?.network,
      refundAddress,
      flow: state.calculator.flowInfo.flow,
      type: state.calculator.flowInfo.type,
      rateId: state.calculator.flowInfo.rateId,
      // extraId?: string
      toAmount,
      provider: '',
      source: '',
    })

    dispatch(setExchangeInfo(exchangeInfo))

    return exchangeInfo
  }

  return undefined
})

export const fetchEstimationAmount = createDebouncedAsyncThunk<GetEstimatedAmountResponse, undefined>(
  'calculator/fetchEstimationAmount',
  { wait: 500 },
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState

    const { fromAmount, toAmount } = selectExchangeAmounts(state)
    const { fromCurrency, toCurrency } = selectExchangeCurrencies(state)

    const toCurrencyInfo = selectCurrencyInfo(state, toCurrency)
    const fromCurrencyInfo = selectCurrencyInfo(state, fromCurrency)

    try {
      return await getEstimatedAmount({
        toCurrency: toCurrencyInfo.ticker,
        toNetwork: toCurrencyInfo.network,
        fromCurrency: fromCurrencyInfo.ticker,
        fromNetwork: fromCurrencyInfo.network,
        fromAmount: state.calculator.flowInfo.type === ExchangeType.Direct ? fromAmount : undefined,
        toAmount: state.calculator.flowInfo.type === ExchangeType.Reverse ? toAmount : undefined,
        type: state.calculator.flowInfo.type,
        flow: state.calculator.flowInfo.flow,
        useRateId: state.calculator.flowInfo.flow === FlowType.FixedRate ? state.calculator.flowInfo.rateId : undefined,
      })
    } catch (e: unknown) {
      return thunkAPI.rejectWithValue('Exchange error')
    }
  },
)

export const initCalculator = createAsyncThunk('calculator/initCalculator', async (_, thunkAPI) => {
  const { dispatch } = thunkAPI

  await dispatch(getCurrencyInfo())
  await dispatch(fetchEstimationAmount())
})
