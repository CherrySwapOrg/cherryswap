import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import { useAppDispatch, useAppSelector } from 'app/store'
import { selectTimerInfoFromTimestamp } from 'features/calculator/selectors'
import { fetchEstimationAmount } from 'features/calculator/thunks'
import { lte } from 'lib/bn'

const useFixedRateTimer = (): string => {
  const [timer, setTimer] = useState(dayjs())

  const dispatch = useAppDispatch()

  const { validUntil } = useAppSelector((state) => state.calculator.flowInfo)
  const timerInfo = useAppSelector((state) => selectTimerInfoFromTimestamp(state, timer))

  useEffect(() => {
    if (timerInfo.duration && lte(timerInfo.duration, 0)) {
      void dispatch(fetchEstimationAmount())
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

  return timerInfo.displayDate
}

export default useFixedRateTimer
