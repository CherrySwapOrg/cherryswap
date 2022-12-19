import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import { useAppDispatch, useAppSelector } from 'app/store'
import { selectTimerInfoForExchangeStatus } from 'features/exchange-status/exchange-status-slice'

const useFixedRateStatusTimer = (): { displayedTime: string; timeLeft: number; totalTime: number | undefined } => {
  const [timer, setTimer] = useState(dayjs())

  const dispatch = useAppDispatch()

  const { validUntil } = useAppSelector((state) => state.exchangeStatus)
  const timerInfo = useAppSelector((state) => selectTimerInfoForExchangeStatus(state, timer))

  useEffect(() => {
    if (timerInfo.duration === 0) {
      // TODO
    }
  }, [dispatch, timerInfo.duration])

  useEffect(() => {
    const intervalObj =
      validUntil !== ''
        ? setInterval(() => {
            setTimer(dayjs())
          }, 1000)
        : null

    return (): void => {
      clearInterval(intervalObj as NodeJS.Timer)
    }
  }, [validUntil])

  return { displayedTime: timerInfo.displayDate, totalTime: timerInfo.totalTime, timeLeft: timerInfo.duration }
}

export default useFixedRateStatusTimer
