import axios from 'axios'

import { ChangeNowExchange } from 'features/exchange-status/types'

export const getExchangeInfo = async (id: string): Promise<ChangeNowExchange> => {
  const { data } = await axios.get<ChangeNowExchange>('/api/exchange-status', {
    params: { id },
  })

  return data
}
