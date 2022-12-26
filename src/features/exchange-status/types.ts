export interface ChangeNowExchange {
  status?: string
  payinAddress?: string
  payoutAddress?: string
  fromCurrency?: string
  toCurrency?: string
  id?: string
  updatedAt?: string
  expectedAmountFrom?: number
  expectedAmountTo?: number
  createdAt?: string
  payinExtraId?: string
  validUntil?: string
  isExpiredExchange: boolean
  amountFrom?: string
  amountTo?: string
  depositReceivedAt?: string
  fromNetwork?: string
  toNetwork?: string
  fromLegacyTicker?: string
  toLegacyTicker?: string
  payinHash?: string
}
