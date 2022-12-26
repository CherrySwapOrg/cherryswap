import React, { useMemo } from 'react'

import styled from '@emotion/styled'

import { useAppSelector } from 'app/store'
import { BREAKPOINTS } from 'helpers/constants'
import useFixedRateStatusTimer from 'hooks/use-fixed-rate-status-timer'

const Wrapper = styled.div`
  background-color: ${({ theme }): string => theme.colors.background.main};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  display: flex;
  padding: 20px;
  position: relative;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px 10px;
  }
`

const InnerWrapper = styled.div<{ width?: number }>`
  background-color: ${({ theme }): string => theme.colors.primary};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ width }): string => (width ? `${width}%` : '100%')};
  opacity: 0.2;
  transition: 0.2s linear;
`

const Time = styled.span`
  color: ${({ theme }): string => theme.colors.primary};
  font-size: 16px;
  font-weight: 400;
`

const TimeHighlight = styled.span`
  font-size: 24px;
  font-weight: 700;
`

interface Props {
  validUntil: string
}

const ValidityTimer: React.FC<Props> = () => {
  const { expectedAmountFrom, fromCurrency } = useAppSelector((state) => state.exchangeStatus)

  const { timeLeft, totalTime, displayedTime } = useFixedRateStatusTimer()

  const width = useMemo(() => {
    if (timeLeft > 0 && totalTime) {
      return (timeLeft / totalTime) * 100
    }

    return 0
  }, [timeLeft, totalTime])

  if (!timeLeft || timeLeft < 0) {
    return null
  }

  return (
    <Wrapper>
      <InnerWrapper width={width} />
      <Time>
        <TimeHighlight>{displayedTime}</TimeHighlight> Time left to send {expectedAmountFrom}{' '}
        {fromCurrency?.toUpperCase()}
      </Time>
    </Wrapper>
  )
}

export default ValidityTimer
