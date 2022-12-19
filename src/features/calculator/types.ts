import { ExchangeType, FlowType } from 'types/exchange'

export interface CurrencyInfo {
  id: string
  ticker: string
  name: string
  network: string
  decimals: string
  hasExternalId: boolean
  tokenContract: string
  regex: string
  isPopular: boolean
  position: number
  defaultValue: number
  manualDefaultValue: number
  isFixedRateEnabled: boolean
  icon: string
}

export interface GetEstimatedAmountRequest {
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  flow: string
  type: string
  useRateId?: string
  fromAmount?: string
  toAmount?: string
}

export interface GetEstimatedAmountResponse {
  id: string
  isAllowed: boolean
  type: string
  label: string
  isConvertible: boolean
  isAmountInRange: boolean
  estimatedAmount: number | null
  maxAmount: number | null
  minAmount: number | null
  priority: number
  custom: Record<string, string> | null
  error: { error: string; message: string }
  cashback: string
}

export interface GetCurrencyInfoResponse {
  id: string
  ticker: string
  current_ticker: string
  name: string
  network: string
  decimals: string
  has_external_id: boolean
  token_contract: string
  regex: string
  is_popular: boolean
  position: number
  default_value: number
  manual_default_value: number
  is_fixed_rate_enabled: boolean
  icon: {
    url: string
  }
  icon_png: {
    url: string
  }
}

export interface CalculatorSlice {
  currencies: {
    from: string
    to: string
  }
  amounts: {
    from?: string
    to?: string
    minAmount?: number
    maxAmount?: number
  }
  addresses: {
    toAddress: string
    refundAddress: string
  }
  currenciesInfo: Record<string, CurrencyInfo>
  estimatedArrivalTime?: string
  estimatedRate: string
  flowInfo: {
    flow: FlowType
    type: ExchangeType
    rateId: string
    validUntil: string
  }
  error: string
  errorMessage: string
  ui: {
    isFromInputTouched: boolean
    isLoadingCalculator: boolean
    isLoadingEstimation: boolean
    isLoadingFromInput: boolean
    isLoadingToInput: boolean
  }
}
