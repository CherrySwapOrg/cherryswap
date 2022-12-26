import axios from 'axios'
import { NextApiHandler } from 'next'

import EnvironmentConfig from 'app/environment-config'

const changeNowApiClient = axios.create({
  baseURL: EnvironmentConfig.changeNowApiUrl,
  headers: {
    'x-changenow-api-key': EnvironmentConfig.changeNowApiKey,
  },
})

const estimate: NextApiHandler = async (req, res) => {
  const {
    query: { fromCurrency, toCurrency, fromNetwork, toNetwork, flow, type, fromAmount, toAmount },
  } = req

  const response = await changeNowApiClient.get('/v2/exchange/estimated-amount', {
    validateStatus: undefined,
    params: {
      fromCurrency,
      fromNetwork,
      toCurrency,
      toNetwork,
      flow,
      type,
      fromAmount,
      toAmount,
    },
  })

  res.status(response.status).json(response?.data)
}

export default estimate
