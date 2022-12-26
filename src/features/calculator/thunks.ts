import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import type { AppState } from 'app/store'
import { getCurrenciesInfo, getEstimatedAmount, getPairInfo, sendExchangeInfo } from 'features/calculator/client'
import {
  selectCurrencyInfo,
  selectExchangeAddresses,
  selectExchangeAmounts,
  selectExchangeCurrencies,
} from 'features/calculator/selectors'
import { CurrencyInfo, GetEstimatedAmountResponse, GetPairInfoResponse } from 'features/calculator/types'
import createDebouncedAsyncThunk from 'features/create-debounced-async-thunk'
import { setExchangeInfo } from 'features/exchange-status/exchange-status-slice'
import { lte } from 'lib/bn'
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

export const fetchEstimationAmount = createDebouncedAsyncThunk<GetEstimatedAmountResponse | undefined, undefined>(
  'calculator/fetchEstimationAmount',
  { wait: 500 },
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState

    const { fromAmount, toAmount } = selectExchangeAmounts(state)
    const { fromCurrency, toCurrency } = selectExchangeCurrencies(state)

    const toCurrencyInfo = selectCurrencyInfo(state, toCurrency)
    const fromCurrencyInfo = selectCurrencyInfo(state, fromCurrency)

    if (
      (state.calculator.flowInfo.type === ExchangeType.Direct && (!fromAmount || lte(fromAmount, 0))) ||
      (state.calculator.flowInfo.type === ExchangeType.Reverse && (!toAmount || lte(toAmount, 0)))
    ) {
      return
    }

    try {
      return await getEstimatedAmount({
        toCurrency: toCurrencyInfo.ticker,
        toNetwork: toCurrencyInfo.network,
        fromCurrency: fromCurrencyInfo.ticker,
        fromNetwork: fromCurrencyInfo.network,
        fromAmount,
        toAmount,
        type: state.calculator.flowInfo.type,
        flow: state.calculator.flowInfo.flow,
        useRateId: state.calculator.flowInfo.flow === FlowType.FixedRate ? state.calculator.flowInfo.rateId : undefined,
      })
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 400 && e.response?.data?.message) {
        return thunkAPI.rejectWithValue(e.response?.data?.message)
      }

      return thunkAPI.rejectWithValue('Exchange error')
    }
  },
)

export const fetchPairInfo = createDebouncedAsyncThunk<GetPairInfoResponse, undefined>(
  'calculator/fetchPairInfo',
  { wait: 500 },
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState

    const { fromCurrency, toCurrency } = selectExchangeCurrencies(state)

    const toCurrencyInfo =
      state.calculator.flowInfo.type === ExchangeType.Direct
        ? selectCurrencyInfo(state, toCurrency)
        : selectCurrencyInfo(state, fromCurrency)
    const fromCurrencyInfo =
      state.calculator.flowInfo.type === ExchangeType.Direct
        ? selectCurrencyInfo(state, fromCurrency)
        : selectCurrencyInfo(state, toCurrency)

    try {
      return await getPairInfo({
        toCurrency: toCurrencyInfo.ticker,
        toNetwork: toCurrencyInfo.network,
        fromCurrency: fromCurrencyInfo.ticker,
        fromNetwork: fromCurrencyInfo.network,
        flow: state.calculator.flowInfo.flow,
      })
    } catch (e) {
      return thunkAPI.rejectWithValue('Pair info error')
    }
  },
)

export const fetchEstimationNewPair = createAsyncThunk('calculator/fetchEstimationNewPair', async (_, thunkAPI) => {
  const { dispatch } = thunkAPI

  await dispatch(fetchPairInfo())
  await dispatch(fetchEstimationAmount())
})

export const initCalculator = createAsyncThunk('calculator/initCalculator', async (_, thunkAPI) => {
  const { dispatch } = thunkAPI

  await dispatch(getCurrencyInfo())
  await dispatch(fetchEstimationNewPair())
})
