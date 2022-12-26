import axios from 'axios'

import EnvironmentConfig from 'app/environment-config'
import {
  CurrencyInfo,
  GetCurrencyInfoResponse,
  GetEstimatedAmountRequest,
  GetEstimatedAmountResponse,
  GetPairInfoRequest,
  GetPairInfoResponse,
} from 'features/calculator/types'
import { ChangeNowExchange } from 'features/exchange-status/types'
import { ExchangeType, FlowType } from 'types/exchange'

const contentApiClient = axios.create({
  baseURL: EnvironmentConfig.contentApiUrl,
})

const generateCurrencyInfoKey = (currency: GetCurrencyInfoResponse): string => {
  if (currency.token_contract) {
    return `${currency.current_ticker}-${currency.network}-${currency.token_contract}`.toLowerCase()
  }

  return `${currency.current_ticker}-${currency.network}`.toLowerCase()
}

const currencyInfoMapper = (currenciesInfo: GetCurrencyInfoResponse[]): Record<string, CurrencyInfo> =>
  currenciesInfo.reduce(
    (acc, currency) => ({
      ...acc,
      [generateCurrencyInfoKey(currency)]: {
        id: currency.id,
        ticker: currency.current_ticker,
        name: currency.name,
        network: currency.network,
        decimals: currency.decimals,
        hasExternalId: currency.has_external_id,
        tokenContract: currency.token_contract,
        regex: currency.regex,
        isPopular: currency.is_popular,
        position: currency.position,
        defaultValue: currency.default_value,
        manualDefaultValue: currency.manual_default_value,
        isFixedRateEnabled: currency.is_fixed_rate_enabled,
        icon:
          `${EnvironmentConfig.contentApiUrl}${currency.icon?.url}` ||
          `${EnvironmentConfig.contentApiUrl}${currency.icon_png?.url}`,
      },
    }),
    {},
  )

export const getCurrenciesInfo = async (): Promise<Record<string, CurrencyInfo>> => {
  const { data } = await contentApiClient.get<GetCurrencyInfoResponse[]>('/currencies', {
    params: {
      _limit: '-1',
      is_fiat: false,
      is_site: true,
      _sort: 'id',
    },
  })

  return currencyInfoMapper(data)
}

export const getPairInfo = async (params: GetPairInfoRequest): Promise<GetPairInfoResponse> => {
  const { data } = await axios.get<GetPairInfoResponse>('/api/exchange-range', {
    params,
  })

  return data
}

export const getEstimatedAmount = async (params: GetEstimatedAmountRequest): Promise<GetEstimatedAmountResponse> => {
  const { data } = await axios.get<GetEstimatedAmountResponse>('/api/estimate', {
    params,
  })

  return data
}

interface SendExchangeParams {
  address: string
  fromAmount: string
  fromCurrency: string
  fromNetwork: string
  provider: string
  source: string
  toCurrency: string
  toNetwork: string
  refundAddress: string
  flow?: FlowType
  type?: ExchangeType
  rateId?: string
  extraId?: string
  toAmount?: string
}

export const sendExchangeInfo = async (params: SendExchangeParams): Promise<ChangeNowExchange> => {
  const { data } = await axios.get<ChangeNowExchange>('/api/create-exchange', {
    params,
  })

  return data
}
