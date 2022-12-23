import React, { useCallback } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Button from 'app/components/button'
import InfoSection from 'app/components/info-section'
import StepperHeading from 'app/components/stepper-heading'
import { useAppDispatch, useAppSelector } from 'app/store'
import { resetExchangeState } from 'features/calculator/calculator-slice'
import { resetExchangeStatusInfo, selectExchangeStatusInfo } from 'features/exchange-status/exchange-status-slice'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  gap: 20px;
`

const ImagesWrapper = styled.div`
  position: relative;
  height: 150px;
  width: 150px;
`

const Description = styled.section`
  width: 100%;
`

const NewExchangeButton = styled(Button)`
  font-weight: 700;
  padding: 22px;
  width: 100%;
`

const FinishedExchange: React.FC = () => {
  const exchangeStatus = useAppSelector(selectExchangeStatusInfo)

  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleNewExchangePress = useCallback(() => {
    dispatch(resetExchangeState())
    dispatch(resetExchangeStatusInfo())
    void router.replace('/exchange')
  }, [dispatch, router])

  return (
    <Wrapper>
      <ImagesWrapper>
        <Image fill src='/images/finished-exchange.svg' alt='Finished exchange' />
        <Image fill style={{ transform: 'scale(0.5)' }} src='/icons/checkmark-icon-white.svg' alt='Finished exchange' />
      </ImagesWrapper>
      <StepperHeading title='Exchange finished!' margin='0' />
      <Description>
        <InfoSection
          title='You Sent'
          value={`${exchangeStatus.amountFrom} ${exchangeStatus.fromCurrency?.toUpperCase()}`}
        />
        <InfoSection title='You Got' value={`${exchangeStatus.amountTo} ${exchangeStatus.toCurrency?.toUpperCase()}`} />
        <InfoSection title='Recipient address' value={exchangeStatus.payoutAddress} />
        <InfoSection title='Transaction ID' value={exchangeStatus.id} />
      </Description>
      <NewExchangeButton onClick={handleNewExchangePress}>Start new exchange</NewExchangeButton>
    </Wrapper>
  )
}

export default FinishedExchange
