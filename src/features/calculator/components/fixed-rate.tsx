import React, { useCallback, useState } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

import HoverPopUp from 'app/components/hover-pop-up'
import { useAppDispatch, useAppSelector } from 'app/store'
import { setFlow } from 'features/calculator/calculator-slice'
import { selectCalculatorUiState, selectIsFixedRate } from 'features/calculator/selectors'
import { fetchEstimationAmount } from 'features/calculator/thunks'
import useFixedRateTimer from 'hooks/use-fixed-rate-timer'
import { FlowType } from 'types/exchange'

const Wrapper = styled.div`
  position: relative;
`

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const WrapperPressedImage = styled.div`
  cursor: pointer;
`

const Timer = styled.span`
  align-items: center;
  background-color: ${({ theme }): string => theme.colors.primary};
  border-radius: ${({ theme }): string => theme.borderRadius.small};
  color: ${({ theme }): string => theme.colors.text.main};
  display: flex;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 4px;
`

const FixedRate: React.FC = () => {
  const [isShowPopUp, setIsShowPopUp] = useState(false)
  const fixedRateTimer = useFixedRateTimer()
  const isFixedRate = useAppSelector(selectIsFixedRate)
  const { isLoadingEstimation } = useAppSelector(selectCalculatorUiState)

  const dispatch = useAppDispatch()

  const handleFixedRatePress = useCallback(() => {
    if (isFixedRate) {
      dispatch(setFlow(FlowType.Standard))
    } else {
      dispatch(setFlow(FlowType.FixedRate))
    }

    void dispatch(fetchEstimationAmount())
  }, [isFixedRate, dispatch])

  return (
    <Wrapper onMouseEnter={() => setIsShowPopUp(true)} onMouseLeave={() => setIsShowPopUp(false)}>
      {isFixedRate ? (
        <InnerWrapper>
          <WrapperPressedImage onClick={handleFixedRatePress}>
            <Image width={16} height={20} src='/icons/fixed-rate-enabled-icon.svg' alt='Lock' />
          </WrapperPressedImage>
          <Timer>
            <Image width={16} height={16} src='/icons/timer-icon.svg' alt='Timer' />
            {!isLoadingEstimation && fixedRateTimer}
          </Timer>
        </InnerWrapper>
      ) : (
        <WrapperPressedImage onClick={handleFixedRatePress}>
          <Image
            onClick={handleFixedRatePress}
            width={16}
            height={20}
            src='/icons/fixed-rate-disabled-icon.svg'
            alt='Lock'
          />
        </WrapperPressedImage>
      )}
      {isShowPopUp && (
        <HoverPopUp
          title='Fixed Rate Mode'
          text='If mode on: the is completed regardless of the rate fluctuations. Cherry Swap guarantees you will  receive the agreed amount.'
        />
      )}
    </Wrapper>
  )
}

export default FixedRate
