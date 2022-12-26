import React from 'react'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import QRCode from 'react-qr-code'

import CopyText from 'app/components/copy-text'
import ExchangeProgress from 'app/components/exchange-progress'
import ExpiredExchange from 'app/components/expired-exchange'
import FinishedExchange from 'app/components/finished-exchange'
import InfoSection from 'app/components/info-section'
import Loader from 'app/components/loader'
import StepperHeading from 'app/components/stepper-heading'
import ValidityTimer from 'app/components/validity-timer'
import { useAppSelector } from 'app/store'
import { selectExchangeStatusInfo } from 'features/exchange-status/exchange-status-slice'
import { BREAKPOINTS } from 'helpers/constants'

const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const InfoWrapper = styled.div`
  position: relative;
  padding-bottom: 60px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding-top: 60px;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    padding: 0;
  }
`

const InfoShadow = styled.div`
  box-shadow: ${({ theme }): string => theme.boxShadow.primary};
  border-radius: ${({ theme }): string => theme.borderRadius.large};
  position: absolute;
  top: -35px;
  left: -50px;
  right: -50px;
  bottom: 35px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    top: 0;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    display: none;
  }
`

const Divider = styled.div`
  background-color: ${({ theme }): string => theme.colors.text.placeholder};
  margin: 30px 0 10px;
  opacity: 0.4;
  height: 1px;
  width: 100%;
`

const MobileDivider = styled(Divider)`
  display: none;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: block;
    margin: 30px 0 30px;
  }
`

const ExchangeStatus: React.FC = () => {
  const exchangeStatus = useAppSelector(selectExchangeStatusInfo)

  const theme = useTheme()

  if (!exchangeStatus.id) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  }

  if (exchangeStatus.isExpiredExchange) {
    return <ExpiredExchange />
  }

  if (exchangeStatus.status === 'finished') {
    return <FinishedExchange />
  }

  return (
    <>
      <InfoWrapper>
        <InfoShadow />
        <StepperHeading title='Send the funds you would like to exchange' />
        <InfoSection
          title='Send in a single transaction this amount:'
          bigValue={`${exchangeStatus.expectedAmountFrom} ${exchangeStatus.fromCurrency}`}
          fontSize={20}
        />
        {exchangeStatus.payinAddress && (
          <>
            <InfoSection title='To this address'>
              <CopyText text={exchangeStatus.payinAddress}>{exchangeStatus.payinAddress}</CopyText>
            </InfoSection>
            <QRCode
              style={{ maxWidth: 160, maxHeight: 160, margin: '10px 0' }}
              fgColor={theme.colors.primary}
              size={256}
              value={exchangeStatus.payinAddress}
            />
          </>
        )}
        <InfoSection title='Transaction ID'>
          <CopyText text={exchangeStatus.id}>{exchangeStatus.id}</CopyText>
        </InfoSection>

        {exchangeStatus.validUntil ? <ValidityTimer validUntil={exchangeStatus.validUntil} /> : null}
      </InfoWrapper>

      <MobileDivider />

      <StepperHeading title='Progress' />
      {exchangeStatus.status && <ExchangeProgress status={exchangeStatus.status} />}
      <Divider />

      <InfoSection
        title='You Get'
        value={`${exchangeStatus.expectedAmountTo} ${exchangeStatus.toCurrency?.toUpperCase()}`}
      />
      <InfoSection title='Recipient address' value={exchangeStatus.payoutAddress} />
    </>
  )
}

export default ExchangeStatus
