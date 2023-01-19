import React from 'react'

import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import Button from 'app/components/button'
import { useAppSelector } from 'app/store'
import Calculator from 'features/calculator/calculator'
import { selectCalculatorUiState, selectExchangeAmounts, selectExchangeError } from 'features/calculator/selectors'
import { BREAKPOINTS } from 'helpers/constants'

const Wrapper = styled.div`
  background-color: ${({ theme }): string => theme.colors.background.light};
  box-shadow: ${({ theme }): string => theme.boxShadow.primary};
  border-radius: ${({ theme }): string => theme.borderRadius.large};
  max-width: 420px;
  height: fit-content;
  padding: 20px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 20px 75px;
    max-width: 100%;
    width: 100%;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    padding: 20px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px 10px;
  }
`

const ExchangeButton = styled(Button)`
  align-items: center;
  display: flex;
  font-weight: 800;
  padding: 23px;
  justify-content: center;
  width: 100%;
`

const CalculatorForm: React.FC = () => {
  const { errorMessage } = useAppSelector(selectExchangeError)
  const { isLoadingFromInput, isLoadingToInput, isLoadingEstimation } = useAppSelector(selectCalculatorUiState)
  const { fromAmount, toAmount } = useAppSelector(selectExchangeAmounts)
  const router = useRouter()
  const handleNextStepPress = () => {
    if (errorMessage || isLoadingEstimation || isLoadingFromInput || isLoadingToInput || !fromAmount || !toAmount) {
      return
    }

    void router.replace('/exchange')
  }

  return (
    <Wrapper>
      <Calculator />
      <ExchangeButton onClick={handleNextStepPress}>Exchange</ExchangeButton>
    </Wrapper>
  )
}

export default CalculatorForm
