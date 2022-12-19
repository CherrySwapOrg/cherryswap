import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchEstimationAmount, getCurrencyInfo } from 'features/calculator/thunks'
import { CalculatorSlice } from 'features/calculator/types'
import { ExchangeType, FlowType } from 'pages/exchange/types'

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
  error: '',
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
      state.flowInfo.type = ExchangeType.Direct
    },
    setIsFromInputTouched: (state, action: PayloadAction<boolean>) => {
      state.ui.isFromInputTouched = action.payload
    },
    setToAmount: (state, action: PayloadAction<string>) => {
      state.amounts.to = action.payload
      state.flowInfo.type = ExchangeType.Reverse
      state.flowInfo.flow = FlowType.FixedRate
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
      const { estimatedAmount } = action.payload

      if (state.flowInfo.type === ExchangeType.Reverse) {
        state.ui.isLoadingFromInput = false
        state.amounts.from = String(estimatedAmount || '')
        state.estimatedRate = (Number(state.amounts.to) / Number(estimatedAmount || 1)).toFixed(2)
      } else {
        state.ui.isLoadingToInput = false
        state.amounts.to = String(estimatedAmount || '')
        state.estimatedRate = (Number(estimatedAmount || 0) / Number(state.amounts.from)).toFixed(2)
      }

      if (state.flowInfo.flow === FlowType.FixedRate) {
        state.flowInfo.rateId = action.payload.custom?.rateId || ''
        state.flowInfo.validUntil = action.payload.custom?.validUntil || ''
      }

      if (action.payload.error) {
        state.amounts.maxAmount = action.payload.maxAmount || undefined
        state.amounts.minAmount = action.payload.minAmount || undefined
        state.error = action.payload.error.error
        state.errorMessage = action.payload.error.message
      } else {
        state.error = ''
        state.errorMessage = ''
      }

      state.estimatedArrivalTime = '10 - 60'
      state.ui.isLoadingEstimation = false
    })
    builder.addCase(fetchEstimationAmount.pending, (state) => {
      state.ui.isLoadingEstimation = true

      if (state.flowInfo.type === ExchangeType.Reverse) {
        state.ui.isLoadingFromInput = true
      } else {
        state.ui.isLoadingToInput = true
      }
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
  resetExchangeState,
} = calculatorSlice.actions

export const calculatorReducer = calculatorSlice.reducer
