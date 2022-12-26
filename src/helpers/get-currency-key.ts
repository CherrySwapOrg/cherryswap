import { CurrencyInfo } from 'features/calculator/types'

export const getCurrencyKey = (currency: CurrencyInfo): string => {
  if (currency.tokenContract) {
    return `${currency.ticker}-${currency.network}-${currency.tokenContract}`.toLowerCase()
  }

  return `${currency.ticker}-${currency.network}`.toLowerCase()
}
