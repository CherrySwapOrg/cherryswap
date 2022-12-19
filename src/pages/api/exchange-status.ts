import axios from 'axios'
import { NextApiHandler } from 'next'

import EnvironmentConfig from 'app/environment-config'

const changeNowApiClient = axios.create({
  baseURL: EnvironmentConfig.changeNowExchangeStatusApiUrl,
  headers: {
    'x-changenow-api-key': EnvironmentConfig.changeNowApiKey,
  },
})

const exchangeStatus: NextApiHandler = async (req, res) => {
  const response = await changeNowApiClient.get(`/v1/transactions/${req.query.id}/${EnvironmentConfig.changeNowApiKey}`)

  res.status(response.status).json(response?.data)
}

export default exchangeStatus
