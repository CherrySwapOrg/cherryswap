import React, { ChangeEvent, useCallback, useState } from 'react'

import styled from '@emotion/styled'
import { NextPage } from 'next'
import Image from 'next/image'

import Footer from 'app/components/footer'
import Header from 'app/components/header'
import Link from 'app/components/link'
import PageBackground from 'app/components/page-background'
import StepperHeading from 'app/components/stepper-heading'
import { inputStyle } from 'app/styles/input-style'
import mainContainer from 'app/styles/main-container'
import { BREAKPOINTS, EXCHANGE_ID_REGEX } from 'helpers/constants'

const Wrapper = styled.div`
  ${mainContainer};
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 30px 0;
  justify-content: center;
`

const StatusForm = styled.div`
  align-items: center;
  background-color: ${({ theme }): string => theme.colors.background.light};
  border-radius: ${({ theme }): string => theme.borderRadius.large};
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 700px;
  padding: 44px 75px;
  width: 100%;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 10px 20px;
  }
`

const InputWrapper = styled.input`
  ${inputStyle};
  background-color: ${({ theme }): string => theme.colors.background.main};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  font-size: 15px;
  font-weight: 600;
  padding: 30px 0;
  text-align: center;
  width: 100%;

  ::placeholder {
    color: ${({ theme }): string => theme.colors.text.placeholder};
  }
`

const CheckLink = styled(Link)`
  background-color: ${({ theme }): string => theme.colors.primary};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  color: ${({ theme }): string => theme.colors.text.main};
  padding: 22px;
  text-align: center;
  width: 100%;
`

const ExchangeStatusPage: NextPage = () => {
  const [exchangeId, setExchangeId] = useState('')

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value && !EXCHANGE_ID_REGEX.test(event.currentTarget.value)) {
      return
    }

    setExchangeId(event.currentTarget.value)
  }, [])

  return (
    <>
      <Header />
      <PageBackground>
        <Wrapper>
          <StatusForm>
            <Image width={150} height={150} src='/images/exchange-status.svg' alt='Check exchange status' />
            <StepperHeading title='Check your transaction status' />
            <InputWrapper value={exchangeId} onChange={handleInputChange} placeholder='Enter Transaction ID' />
            <CheckLink href={`/exchange?id=${exchangeId}`}>Check</CheckLink>
          </StatusForm>
        </Wrapper>
      </PageBackground>
      <Footer />
    </>
  )
}

export default ExchangeStatusPage
