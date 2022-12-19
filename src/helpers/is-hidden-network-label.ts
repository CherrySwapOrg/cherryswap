import { CurrencyInfo } from 'features/calculator/types'

export const isHiddenNetworkLabel = (currency: CurrencyInfo): boolean =>
  currency.ticker?.toLowerCase() === currency.network?.toLowerCase()
