import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchEstimationAmount, fetchPairInfo, getCurrencyInfo } from 'features/calculator/thunks'
import { CalculatorSlice } from 'features/calculator/types'
import { dividedBy, getFormattedLargeValue } from 'lib/bn'
import { ExchangeType, FlowType } from 'types/exchange'

const initialState: CalculatorSlice = {
  currencies: {
    from: 'btc-btc',
    to: 'eth-eth',
  },
  amounts: {
    from: '0.1',
    to: undefined,
    minAmount: undefined,
    maxAmount: undefined,
  },
  addresses: {
    toAddress: '',
    refundAddress: '',
  },
  estimatedArrivalTime: undefined,
  estimatedRate: '0',
  flowInfo: {
    flow: FlowType.Standard,
    type: ExchangeType.Direct,
    rateId: '',
    validUntil: '',
  },
  currenciesInfo: {},
  // error: '',
  errorMessage: '',
  ui: {
    isFromInputTouched: false,
    isLoadingCalculator: true,
    isLoadingEstimation: true,
    isLoadingFromInput: false,
    isLoadingToInput: false,
  },
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setFromAmount: (state, action: PayloadAction<string>) => {
      state.amounts.from = action.payload
    },
    setIsFromInputTouched: (state, action: PayloadAction<boolean>) => {
      state.ui.isFromInputTouched = action.payload
    },
    setToAmount: (state, action: PayloadAction<string>) => {
      state.amounts.to = action.payload
    },
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.currencies.from = action.payload
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.currencies.to = action.payload
    },
    setToAddress: (state, action: PayloadAction<string>) => {
      state.addresses.toAddress = action.payload
    },
    setRefundAddress: (state, action: PayloadAction<string>) => {
      state.addresses.refundAddress = action.payload
    },
    reverseExchange: (state) => {
      const {
        currencies: { from, to },
      } = state

      state.currencies.to = from
      state.currencies.from = to
    },
    setFlow: (state, action: PayloadAction<FlowType>) => {
      state.flowInfo.flow = action.payload
    },
    setExchangeType: (state, action: PayloadAction<ExchangeType>) => {
      state.flowInfo.type = action.payload
    },
    resetErrors: (state) => {
      state.errorMessage = ''
    },
    resetFixedRateInfo: (state) => {
      state.flowInfo.rateId = ''
      state.flowInfo.validUntil = ''
    },
    resetExchangeState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrencyInfo.fulfilled, (state, action) => {
      state.currenciesInfo = action.payload.currenciesInfo
      state.ui.isLoadingCalculator = false
    })
    builder.addCase(getCurrencyInfo.pending, (state) => {
      state.ui.isLoadingCalculator = true
    })
    builder.addCase(fetchEstimationAmount.fulfilled, (state, action) => {
      state.ui.isLoadingFromInput = false
      state.ui.isLoadingToInput = false
      state.ui.isLoadingEstimation = false

      if (action.payload) {
        const { toAmount, fromAmount } = action.payload

        if (state.flowInfo.type === ExchangeType.Reverse) {
          state.amounts.from = String(fromAmount || '')
          state.estimatedRate = getFormattedLargeValue(dividedBy(state.amounts.to || 0, fromAmount || 1).toString())
        } else {
          state.amounts.to = String(toAmount || '')
          state.estimatedRate = getFormattedLargeValue(dividedBy(toAmount || 0, state.amounts.from || 1).toString())
        }

        state.flowInfo.rateId = action.payload.rateId || ''
        state.flowInfo.validUntil = action.payload.validUntil || ''
        state.estimatedArrivalTime = action.payload.transactionSpeedForecast || '10 - 60'
      } else {
        state.amounts.to = ''
        state.amounts.from = ''
        state.estimatedRate = ''
      }
    })
    builder.addCase(fetchEstimationAmount.pending, (state) => {
      state.ui.isLoadingEstimation = true
      state.errorMessage = ''

      if (state.flowInfo.type === ExchangeType.Reverse) {
        state.ui.isLoadingFromInput = true
      } else {
        state.ui.isLoadingToInput = true
      }
    })
    builder.addCase(fetchEstimationAmount.rejected, (state, action) => {
      state.errorMessage = action.payload as string

      if (state.flowInfo.type === ExchangeType.Reverse) {
        state.ui.isLoadingFromInput = false
        state.amounts.from = ''
        state.estimatedRate = ''
      } else {
        state.ui.isLoadingToInput = false
        state.amounts.to = ''
        state.estimatedRate = ''
      }

      state.ui.isLoadingEstimation = false
    })
    builder.addCase(fetchPairInfo.fulfilled, (state, action) => {
      state.amounts.maxAmount = action.payload.maxAmount || undefined
      state.amounts.minAmount = action.payload.minAmount || undefined
    })
  },
})

export const {
  setFromAmount,
  setIsFromInputTouched,
  setToAmount,
  setFromCurrency,
  setToCurrency,
  setToAddress,
  setRefundAddress,
  reverseExchange,
  setFlow,
  setExchangeType,
  resetExchangeState,
  resetFixedRateInfo,
  resetErrors,
} = calculatorSlice.actions

export const calculatorReducer = calculatorSlice.reducer
