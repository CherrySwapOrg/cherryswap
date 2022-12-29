import React, { ChangeEvent, useCallback, useState, useRef } from 'react'

import { css, SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { OnResultFunction, QrReader } from 'react-qr-reader'

import Button from 'app/components/button'
import InputWithIcon from 'app/components/input-with-icon'
import StepperHeading from 'app/components/stepper-heading'
import { useAppDispatch, useAppSelector } from 'app/store'
import Calculator from 'features/calculator/calculator'
import { setRefundAddress, setToAddress } from 'features/calculator/calculator-slice'
import {
  selectCalculatorUiState,
  selectCurrencyInfo,
  selectExchangeAddresses,
  selectExchangeAmounts,
  selectExchangeCurrencies,
  selectExchangeError,
} from 'features/calculator/selectors'
import { BREAKPOINTS } from 'helpers/constants'
import { validateAddress } from 'helpers/validate-address'

const Wrapper = styled.div``

const InputWrapper = styled.div`
  margin: 30px 0 10px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    margin: 25px 0 0;
  }
`

const AdditionalSettingsWrapper = styled.div`
  margin-top: 40px;
`

const HeadingWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
`

const advancedButtonMobile = css`
  display: none;

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    display: flex;
    margin: 25px auto 0;
  }
`

const advancedButton = css`
  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    display: none;
  }
`

const AdvancedSettingsButton = styled(Button)<{ isMobile?: boolean }>`
  align-items: center;
  background: transparent;
  color: ${({ theme }): string => theme.colors.primary};
  display: flex;

  :hover,
  :focus {
    background: transparent;
  }

  ${({ isMobile }): SerializedStyles => (isMobile ? advancedButtonMobile : advancedButton)}
`

const AdvancedSettingsImageWrapper = styled.div<{ isOpened: boolean }>`
  transition: 0.2s linear;
  transform: rotate(${({ isOpened }): string => (isOpened ? '0deg' : '180deg')});
`

const AdvancedSettingsWrapper = styled.div<{ height: number }>`
  height: ${({ height }): string => `${height}px`};
  overflow: hidden;
  transition: 0.2s linear;
`

const QrMainWrapper = styled.div`
  border-radius: 24px;
  position: relative;
  overflow: hidden;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    margin-top: 25px;
  }
`

const QRWrapper = styled.div`
  background-color: ${({ theme }): string => theme.colors.primary};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  overflow: hidden;
  position: relative;
  mask-image: url('/images/qr-mask.svg');
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
  z-index: 2;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px 0;
    mask-size: 150% 150%;
    mask-position: 50% 50%;
  }
`

const QROverlay = styled.div`
  background: url('/images/qr-background.svg') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    background-size: 150% 150%;
    background-position: 50% 50%;
  }
`

const NextButton = styled(Button)`
  font-weight: 700;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
`

interface Props {
  onNextPress: () => void
}

const InfoStep: React.FC<Props> = ({ onNextPress }) => {
  const [inputForQr, setInputForQr] = useState('to')
  const [settingsHeight, setSettingsHeight] = useState(0)
  const [isOpenedQrReader, setIsOpenedQrReader] = useState(false)
  const [isAdvancedSettingsShown, setIsAdvancedSettingsShown] = useState(false)

  const { errorMessage } = useAppSelector(selectExchangeError)
  const { toAddress, refundAddress } = useAppSelector(selectExchangeAddresses)
  const { fromAmount, toAmount } = useAppSelector(selectExchangeAmounts)
  const { fromCurrency, toCurrency } = useAppSelector(selectExchangeCurrencies)
  const { isLoadingFromInput, isLoadingToInput, isLoadingEstimation } = useAppSelector(selectCalculatorUiState)

  const [isErrorAddress, setIsErrorAddres] = useState(false)
  const [isErrorRefundAddress, setIsErrorRefundAddress] = useState(false)

  const toCurrencyInfo = useAppSelector((state) => selectCurrencyInfo(state, toCurrency))
  const fromCurrencyInfo = useAppSelector((state) => selectCurrencyInfo(state, fromCurrency))

  const advancedSettingsWrapperRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const handleChangeToAddress = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget

      if (toCurrencyInfo.regex) {
        const isValidAddress = validateAddress(toCurrencyInfo, value)

        if (value) {
          setIsErrorAddres(!isValidAddress)
        } else {
          setIsErrorAddres(false)
        }
      }

      dispatch(setToAddress(value))
    },
    [toCurrencyInfo, dispatch],
  )

  const handleChangeRefundAddress = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget

      const isValidAddress = validateAddress(fromCurrencyInfo, value)

      if (value) {
        setIsErrorRefundAddress(!isValidAddress)
      } else {
        setIsErrorRefundAddress(false)
      }

      dispatch(setRefundAddress(value))
    },
    [fromCurrencyInfo, dispatch],
  )

  const handlePressQrButton = useCallback(
    (input: string) => () => {
      if (isOpenedQrReader) {
        setIsOpenedQrReader(false)
      } else {
        setInputForQr(input)
        setIsOpenedQrReader(true)
      }
    },
    [isOpenedQrReader],
  )

  const handleAdvancedSettingsPress = useCallback(() => {
    if (!isAdvancedSettingsShown && advancedSettingsWrapperRef.current) {
      setSettingsHeight(advancedSettingsWrapperRef.current.scrollHeight)
    }

    if (isAdvancedSettingsShown) {
      setSettingsHeight(0)
    }

    setIsAdvancedSettingsShown(!isAdvancedSettingsShown)
  }, [isAdvancedSettingsShown])

  const handleQrScan: OnResultFunction = useCallback(
    (result, error) => {
      const value = !!result && result.getText()

      if (error?.message === 'Permission denied') {
        setIsOpenedQrReader(false)
      }

      if (inputForQr === 'to' && value) {
        dispatch(setToAddress(value))
        setIsErrorAddres(!validateAddress(toCurrencyInfo, value))
        setIsOpenedQrReader(false)
      }

      if (inputForQr === 'refund' && value) {
        dispatch(setRefundAddress(value))
        setIsErrorRefundAddress(!validateAddress(fromCurrencyInfo, value))
        setIsOpenedQrReader(false)
      }
    },
    [inputForQr, dispatch, toCurrencyInfo, fromCurrencyInfo],
  )

  const handleNextStepPress = useCallback(() => {
    if (errorMessage || isLoadingEstimation || isLoadingFromInput || isLoadingToInput || !fromAmount || !toAmount) {
      return
    }

    if (!toAddress || isErrorAddress) {
      setIsErrorAddres(true)

      return
    }

    if (refundAddress && isErrorRefundAddress) {
      if (!isAdvancedSettingsShown) {
        handleAdvancedSettingsPress()
      }

      return
    }

    onNextPress()
  }, [
    isErrorAddress,
    refundAddress,
    toAddress,
    isErrorRefundAddress,
    isAdvancedSettingsShown,
    handleAdvancedSettingsPress,
    onNextPress,
    errorMessage,
    isLoadingFromInput,
    isLoadingToInput,
    isLoadingEstimation,
    toAmount,
    fromAmount,
  ])

  return (
    <Wrapper>
      <StepperHeading title='Check exchange amount' />
      <Calculator />
      <AdditionalSettingsWrapper>
        <HeadingWrapper>
          <StepperHeading margin='0' title={`Recipient ${toCurrencyInfo?.ticker?.toUpperCase()} wallet`} />
          <AdvancedSettingsButton onClick={handleAdvancedSettingsPress}>
            Advanced settings{' '}
            <AdvancedSettingsImageWrapper isOpened={isAdvancedSettingsShown}>
              <Image width={20} height={20} src='/icons/arrow-down-red.svg' alt='Arrow down' />
            </AdvancedSettingsImageWrapper>
          </AdvancedSettingsButton>
        </HeadingWrapper>
        <InputWrapper>
          <InputWithIcon
            value={toAddress}
            onChange={handleChangeToAddress}
            isAddressValid={Boolean(toAddress && !isErrorAddress)}
            errorMessage={`Please enter a valid ${toCurrencyInfo?.ticker?.toUpperCase()} payout address`}
            placeholder={`Enter the ${toCurrencyInfo?.ticker?.toUpperCase()} wallet address`}
            iconSize={30}
            padding='30px 20px'
            isErrorShown={isErrorAddress}
            onIconClick={handlePressQrButton('to')}
          />
        </InputWrapper>
        <AdvancedSettingsButton isMobile onClick={handleAdvancedSettingsPress}>
          Advanced settings{' '}
          <AdvancedSettingsImageWrapper isOpened={isAdvancedSettingsShown}>
            <Image width={20} height={20} src='/icons/arrow-down-red.svg' alt='Arrow down' />
          </AdvancedSettingsImageWrapper>
        </AdvancedSettingsButton>
        <AdvancedSettingsWrapper ref={advancedSettingsWrapperRef} height={settingsHeight}>
          <InputWrapper>
            <InputWithIcon
              value={refundAddress}
              onChange={handleChangeRefundAddress}
              isAddressValid={Boolean(refundAddress && !isErrorRefundAddress)}
              errorMessage={`Please enter a valid ${fromCurrencyInfo?.ticker?.toUpperCase()} address`}
              placeholder={`Enter ${fromCurrencyInfo?.ticker?.toUpperCase()} refund address`}
              iconSize={30}
              padding='30px 20px'
              isErrorShown={isErrorRefundAddress}
              onIconClick={handlePressQrButton('refund')}
            />
          </InputWrapper>
        </AdvancedSettingsWrapper>
      </AdditionalSettingsWrapper>
      {isOpenedQrReader && (
        <QrMainWrapper>
          <QRWrapper>
            <QrReader
              onResult={handleQrScan}
              videoContainerStyle={{ padding: 0, width: '100%', aspectRatio: '4/2.5' }}
              videoStyle={{ borderRadius: 24 }}
              constraints={{ facingMode: 'user' }}
            />
          </QRWrapper>
          <QROverlay />
        </QrMainWrapper>
      )}
      <NextButton onClick={handleNextStepPress}>Next</NextButton>
    </Wrapper>
  )
}
export default InfoStep
