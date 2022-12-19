import React, { useCallback } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Button from 'app/components/button'
import StepperHeading from 'app/components/stepper-heading'
import { useAppDispatch } from 'app/store'
import { resetExchangeState } from 'features/calculator/calculator-slice'
import { resetExchangeStatusInfo } from 'features/exchange-status/exchange-status-slice'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  gap: 20px;
`

const Description = styled.span`
  font-size: 16px;
  text-align: center;
  line-height: 170%;
`

const NewExchangeButton = styled(Button)`
  font-weight: 700;
  padding: 22px;
  width: 100%;
`

const ExpiredExchange: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleNewExchangePress = useCallback(() => {
    dispatch(resetExchangeState())
    dispatch(resetExchangeStatusInfo())
    void router.replace('/exchange')
  }, [dispatch, router])

  return (
    <Wrapper>
      <Image width={150} height={150} src='/images/expired-exchange.svg' alt='Expired exchange' />
      <StepperHeading title="Time's up" margin='0' />
      <Description>
        It’s been more than 20 minutes since you’ve initiated the transaction, so we cannot proceed the fixed rate
        exchange. Please start a new one.
      </Description>
      <NewExchangeButton onClick={handleNewExchangePress}>Start new exchange</NewExchangeButton>
    </Wrapper>
  )
}

export default ExpiredExchange
