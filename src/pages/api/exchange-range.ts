import axios from 'axios'
import { NextApiHandler } from 'next'

import EnvironmentConfig from 'app/environment-config'

const changeNowApiClient = axios.create({
  baseURL: EnvironmentConfig.changeNowApiUrl,
  headers: {
    'x-changenow-api-key': EnvironmentConfig.changeNowApiKey,
  },
})

const exchangeRange: NextApiHandler = async (req, res) => {
  const {
    query: { fromCurrency, toCurrency, fromNetwork, toNetwork, flow },
  } = req

  const response = await changeNowApiClient.get('/v2/exchange/range', {
    validateStatus: undefined,
    params: {
      fromCurrency,
      fromNetwork,
      toCurrency,
      toNetwork,
      flow,
    },
  })

  res.status(response.status).json(response?.data)
}

export default exchangeRange
