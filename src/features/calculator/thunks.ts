import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import type { AppState } from 'app/store'
import {
  resetErrors,
  resetFixedRateInfo,
  setExchangeType,
  setFlow,
  setFromAmount,
  setIsFromInputTouched,
  setToAmount,
} from 'features/calculator/calculator-slice'
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
import validateNumericString from 'helpers/validate-numeric-string'
import { eq, formatInputValue, gte, lte } from 'lib/bn'
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

    const { fromAmount, toAmount, minAmount, maxAmount } = selectExchangeAmounts(state)
    const { fromCurrency, toCurrency } = selectExchangeCurrencies(state)

    const toCurrencyInfo = selectCurrencyInfo(state, toCurrency)
    const fromCurrencyInfo = selectCurrencyInfo(state, fromCurrency)

    const checkedAmount = state.calculator.flowInfo.type === ExchangeType.Direct ? fromAmount : toAmount

    if (!checkedAmount || lte(checkedAmount, 0)) {
      return
    }

    if ((minAmount && lte(checkedAmount, minAmount)) || (maxAmount && gte(checkedAmount, maxAmount))) {
      return thunkAPI.rejectWithValue('Entered amount out of range')
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

  const state = thunkAPI.getState() as AppState
  const {
    calculator: { flowInfo, amounts, currenciesInfo, currencies },
  } = state

  if (flowInfo.type === ExchangeType.Direct && !amounts.from) {
    const amount = currenciesInfo[currencies.from]?.manualDefaultValue || currenciesInfo[currencies.from]?.defaultValue

    if (amount) {
      void dispatch(setFromAmount(String(amount)))
    }
  }

  if (flowInfo.type === ExchangeType.Reverse && !amounts.to) {
    const amount = currenciesInfo[currencies.to]?.manualDefaultValue || currenciesInfo[currencies.to]?.defaultValue

    if (amount) {
      void dispatch(setToAmount(String(amount)))
    }
  }
})

export const changeFromAmount = createAsyncThunk<void, { amount: string; currencyInfo: CurrencyInfo }>(
  'exchange/changeFromAmount',
  ({ amount, currencyInfo }, thunkAPI) => {
    const { dispatch } = thunkAPI

    dispatch(resetErrors())
    dispatch(resetFixedRateInfo())
    void dispatch(setIsFromInputTouched(true))
    void dispatch(setExchangeType(ExchangeType.Direct))

    const formattedAmount = formatInputValue(amount)

    if (formattedAmount === '' || eq(formattedAmount, 0)) {
      dispatch(setFromAmount(formattedAmount))
      dispatch(setToAmount(''))

      return
    }

    if (validateNumericString(formattedAmount, Number(currencyInfo?.decimals))) {
      void dispatch(setFromAmount(formattedAmount))
      void dispatch(fetchEstimationAmount())
    }
  },
)

export const changeToAmount = createAsyncThunk<void, { amount: string; currencyInfo: CurrencyInfo }>(
  'exchange/changeFromAmount',
  ({ amount, currencyInfo }, thunkAPI) => {
    const { dispatch } = thunkAPI

    dispatch(resetErrors())
    dispatch(resetFixedRateInfo())
    void dispatch(setExchangeType(ExchangeType.Reverse))
    void dispatch(setFlow(FlowType.FixedRate))

    const formattedAmount = formatInputValue(amount)

    if (formattedAmount === '' || eq(formattedAmount, 0)) {
      dispatch(setFromAmount(''))
      dispatch(setToAmount(formattedAmount))

      return
    }

    if (validateNumericString(formattedAmount, Number(currencyInfo?.decimals))) {
      void dispatch(setToAmount(formattedAmount))
      void dispatch(fetchEstimationAmount())
    }
  },
)
