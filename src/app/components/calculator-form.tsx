import React from 'react'

import styled from '@emotion/styled'

import Button from 'app/components/button'
import Link from 'app/components/link'
import Calculator from 'features/calculator/calculator'
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

const CalculatorForm: React.FC = () => (
  <Wrapper>
    <Calculator />
    <Link href='/exchange'>
      <ExchangeButton>Exchange</ExchangeButton>
    </Link>
  </Wrapper>
)

export default CalculatorForm
