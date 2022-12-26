import axios from 'axios'
import { NextApiHandler } from 'next'

import EnvironmentConfig from 'app/environment-config'

const changeNowApiClient = axios.create({
  baseURL: EnvironmentConfig.changeNowApiUrl,
  headers: {
    'x-changenow-api-key': EnvironmentConfig.changeNowApiKey,
  },
})

const createExchange: NextApiHandler = async (req, res) => {
  const response = await changeNowApiClient.post('/v2/exchange', req.query)

  res.status(response.status).json(response?.data)
}

export default createExchange
