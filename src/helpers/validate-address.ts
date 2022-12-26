import { CurrencyInfo } from 'features/calculator/types'

export const validateAddress = (currencyInfo: CurrencyInfo, address: string): boolean => {
  if (currencyInfo.regex) {
    return new RegExp(currencyInfo.regex).test(address)
  }

  return false
}
