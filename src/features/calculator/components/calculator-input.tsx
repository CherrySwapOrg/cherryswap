import React, { ChangeEvent } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

import CurrencyIconAndTicker from 'app/components/currency-icon-and-ticker'
import InputErrorMessage from 'app/components/input-error-message'
import Loader from 'app/components/loader'
import { useAppSelector } from 'app/store'
import { inputStyle } from 'app/styles/input-style'
import { selectCurrencyInfo } from 'features/calculator/selectors'
import { BREAKPOINTS } from 'helpers/constants'

const GeneralWrapper = styled.div``

const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }): string => theme.colors.background.main};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  display: flex;
  flex-direction: row;
  padding: 8px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  justify-content: space-between;
  position: relative;
  z-index: 4;
`

const Title = styled.span`
  color: ${({ theme }): string => theme.colors.text.dark};
  font-size: 14px;
  font-weight: 500;
  opacity: 0.5;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 12px;
  }
`

const AmountInput = styled.input<{ isFixedRate?: boolean }>`
  ${inputStyle};
  color: ${({ theme, isFixedRate }): string => (isFixedRate ? theme.colors.primary : theme.colors.text.dark)};

  ::placeholder {
    color: ${({ theme }): string => theme.colors.text.placeholder};
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 18px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

const CurrencyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const LoaderWrapper = styled.div`
  padding: 15px 0;
`

interface Props {
  title: string
  currency: string
  amount?: string
  isLoading?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onCurrencyPress?: () => void
  isFixedRate?: boolean
  isErrorShown?: boolean
  errorMessage?: string
}

const CalculatorInput: React.FC<Props> = ({
  amount,
  currency,
  isLoading,
  title,
  onCurrencyPress,
  onChange,
  isFixedRate,
  isErrorShown,
  errorMessage,
}) => {
  const currencyInfo = useAppSelector((state) => selectCurrencyInfo(state, currency))

  return (
    <GeneralWrapper>
      <Wrapper>
        <InputWrapper>
          {isLoading ? (
            <LoaderWrapper>
              <Loader size='26px' />
            </LoaderWrapper>
          ) : (
            <>
              <Title>{title}</Title>
              <AmountInput value={amount} onChange={onChange} isFixedRate={isFixedRate} placeholder='0.0' />
            </>
          )}
        </InputWrapper>
        <CurrencyWrapper onClick={onCurrencyPress}>
          <CurrencyIconAndTicker currencyInfo={currencyInfo} />
          <Image style={{ marginLeft: 10 }} width={10} height={6} src='/icons/arrow-down.svg' alt='Arrow down' />
        </CurrencyWrapper>
      </Wrapper>
      <InputErrorMessage isShown={isErrorShown} errorMessage={errorMessage} />
    </GeneralWrapper>
  )
}

export default CalculatorInput
