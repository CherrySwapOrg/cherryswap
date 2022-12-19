import { createAsyncThunk } from '@reduxjs/toolkit'

import { getExchangeInfo } from 'features/exchange-status/client'
import { setExchangeInfo } from 'features/exchange-status/exchange-status-slice'

export const fetchExchangeInfo = createAsyncThunk<void, string>(
  'exchangeStatus/getExchangeInfo',
  async (id, thunkAPI) => {
    const exchangeInfo = await getExchangeInfo(id)

    const { dispatch } = thunkAPI

    dispatch(setExchangeInfo(exchangeInfo))
  },
)
