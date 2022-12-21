import React, { useCallback } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

import Button from 'app/components/button'
import { useAppDispatch } from 'app/store'
import { reverseExchange } from 'features/calculator/calculator-slice'
import { fetchEstimationAmount } from 'features/calculator/thunks'

const SwapButtonWrapper = styled(Button)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`

const SwapButton: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleSwapPress = useCallback(() => {
    void dispatch(reverseExchange())
    void dispatch(fetchEstimationAmount())
  }, [dispatch])

  return (
    <SwapButtonWrapper onClick={handleSwapPress}>
      <Image
        style={{ display: 'inline-block' }}
        width={20}
        height={20}
        src='/icons/swap-icon.svg'
        alt='Swap Exchange'
      />
    </SwapButtonWrapper>
  )
}

export default SwapButton
