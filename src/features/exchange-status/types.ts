export interface ChangeNowExchange {
  status?: string
  payinAddress?: string
  payoutAddress?: string
  fromCurrency?: string
  toCurrency?: string
  id?: string
  updatedAt?: string
  expectedSendAmount?: number
  expectedReceiveAmount?: number
  createdAt?: string
  isPartner?: boolean
  payinExtraId?: string
  payinExtraIdName?: string
  validUntil?: string
  isExpiredExchange: boolean
  amountSend?: string
  amountReceive?: string
}
