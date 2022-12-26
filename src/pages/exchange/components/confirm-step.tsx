import React, { useCallback, useMemo, useState } from 'react'

import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import Button from 'app/components/button'
import Checkbox from 'app/components/checkbox'
import InfoSection from 'app/components/info-section'
import StepperHeading from 'app/components/stepper-heading'
import WarningModal from 'app/components/warning-modal'
import { useAppDispatch, useAppSelector } from 'app/store'
import {
  selectArrivalTime,
  selectCurrencyInfo,
  selectExchangeAddresses,
  selectExchangeAmounts,
  selectExchangeCurrencies,
} from 'features/calculator/selectors'
import { sendExchange } from 'features/calculator/thunks'

const ConfirmWrapper = styled.div``

const Divider = styled.div`
  background-color: ${({ theme }): string => theme.colors.text.placeholder};
  height: 1px;
  width: 100%;
  opacity: 0.3;
`

const SectionWrapper = styled.div`
  padding: 13px 0;
`

const CheckboxText = styled.span`
  color: ${({ theme }): string => theme.colors.text.dark};
  font-size: 13px;
  opacity: 0.5;
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
`

const CommonButton = styled(Button)`
  font-weight: 800;
  padding: 17px;
`

const BackButton = styled(CommonButton)`
  background-color: ${({ theme }): string => theme.colors.button.background.light};
  color: ${({ theme }): string => theme.colors.text.placeholder};
  flex-basis: 30%;
`

const NextButton = styled(CommonButton)`
  flex-basis: 70%;
`

const MobileModal = styled.div`
  align-items: center;
  background-color: ${({ theme }): string => theme.colors.text.dark};
  justify-content: center;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 11;
`

interface Props {
  onBackStepPress: () => void
}

const ConfirmStep: React.FC<Props> = ({ onBackStepPress }) => {
  const arrivalTime = useAppSelector(selectArrivalTime)
  const { fromAmount, toAmount } = useAppSelector(selectExchangeAmounts)
  const { toAddress, refundAddress } = useAppSelector(selectExchangeAddresses)
  const { fromCurrency, toCurrency } = useAppSelector(selectExchangeCurrencies)

  const toCurrencyInfo = useAppSelector((state) => selectCurrencyInfo(state, toCurrency))
  const fromCurrencyInfo = useAppSelector((state) => selectCurrencyInfo(state, fromCurrency))

  const [isAgreed, setIsAgreed] = useState(true)
  const [isModalShown, setIsModalShown] = useState(true)
  const [didWarningShow, setDidWarningShow] = useState(false)

  const router = useRouter()
  const dispatch = useAppDispatch()

  const exchangeRate = useMemo(() => {
    if (Number(fromAmount) && Number(toAmount)) {
      return `1 ${fromCurrencyInfo.ticker?.toUpperCase()} ~ ${
        Number(toAmount) / Number(fromAmount)
      } ${toCurrencyInfo.ticker?.toUpperCase()}`
    }

    return ''
  }, [fromAmount, toAmount, fromCurrencyInfo, toCurrencyInfo])

  const handleCheckboxChange = useCallback(() => {
    setIsAgreed(!isAgreed)
  }, [isAgreed])

  const handleNextPress = useCallback(
    // eslint-disable-next-line
    async (event: any) => {
      event.stopPropagation()

      if (window.innerWidth < 990 && !didWarningShow) {
        setDidWarningShow(true)
        setIsModalShown(true)

        return
      }

      if (!isAgreed) {
        return
      }

      const exchange = await dispatch(sendExchange()).unwrap()

      if (exchange?.id) {
        void router.replace(`/exchange?id=${exchange?.id}`)
      }
    },
    [isAgreed, dispatch, router, didWarningShow],
  )

  return (
    <ConfirmWrapper>
      <StepperHeading title='Confirm the details of exchange' />
      <Divider />
      <SectionWrapper>
        <InfoSection title='You Send' bigValue={`${fromAmount} ${fromCurrencyInfo.ticker}`} />
        <InfoSection title='You Get' bigValue={`${toAmount} ${toCurrencyInfo.ticker}`} />
      </SectionWrapper>
      <Divider />
      <SectionWrapper>
        <InfoSection title='Recipient address' value={toAddress} />
        {refundAddress && <InfoSection title='Refund address' value={refundAddress} />}
        <InfoSection title='Expected exchange rate' value={exchangeRate} />
        <InfoSection title='Estimated arrival time' value={`≈ ${arrivalTime} minutes`} />
      </SectionWrapper>
      <Divider />
      <SectionWrapper>
        <Checkbox id='agreement' checked={isAgreed} onChange={handleCheckboxChange}>
          <CheckboxText>
            I&apos;ve read and agree to the Terms of Use, Privacy Policy and Risk Disclosure Statement
          </CheckboxText>
        </Checkbox>
      </SectionWrapper>
      <ButtonsWrapper>
        <BackButton onClick={onBackStepPress}>Back</BackButton>
        <NextButton onClick={(event): Promise<void> => handleNextPress(event)}>Next</NextButton>
      </ButtonsWrapper>
      {isModalShown && (
        <MobileModal>
          <WarningModal onClose={(): void => setIsModalShown(false)} />
        </MobileModal>
      )}
    </ConfirmWrapper>
  )
}

export default ConfirmStep
