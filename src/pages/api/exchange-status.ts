import axios from 'axios'
import { NextApiHandler } from 'next'

import EnvironmentConfig from 'app/environment-config'

const changeNowApiClient = axios.create({
  baseURL: EnvironmentConfig.changeNowApiUrl,
  headers: {
    'x-changenow-api-key': EnvironmentConfig.changeNowApiKey,
  },
})

const exchangeStatus: NextApiHandler = async (req, res) => {
  const {
    query: { id },
  } = req

  const response = await changeNowApiClient.get(`/v2/exchange/by-id`, {
    params: {
      id,
    },
  })

  res.status(response.status).json(response?.data)
}

export default exchangeStatus
