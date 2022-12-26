import React, { useCallback, useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Footer from 'app/components/footer'
import Header from 'app/components/header'
import Loader from 'app/components/loader'
import WarningModal from 'app/components/warning-modal'
import { useAppDispatch } from 'app/store'
import mainContainer from 'app/styles/main-container'
import { fetchExchangeInfo } from 'features/exchange-status/thunks'
import { BREAKPOINTS } from 'helpers/constants'
import ConfirmStep from 'pages/exchange/components/confirm-step'
import ExchangeStatus from 'pages/exchange/components/exchange-status'
import InfoStep from 'pages/exchange/components/info-step'
import MobileSteps from 'pages/exchange/components/mobile-steps'
import Steps from 'pages/exchange/components/steps'
import { Step } from 'types/exchange'

const StepperWrapper = styled.div`
  ${mainContainer};
  display: flex;
  gap: 40px;
  padding: 20px 0 100px;
  justify-content: space-between;
`

const TotalStepsWrapper = styled.div`
  background-color: ${({ theme }): string => theme.colors.background.light};
  border-radius: ${({ theme }): string => theme.borderRadius.large};
  width: 340px;
  height: fit-content;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: none;
  }
`

const StepsWithModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: none;
  }
`

const StepWrapper = styled.div`
  background-color: ${({ theme }): string => theme.colors.background.light};
  box-shadow: ${({ theme }): string => theme.boxShadow.primary};
  border-radius: ${({ theme }): string => theme.borderRadius.large};
  flex-grow: 1;
  padding: 60px 75px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 100%;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    padding: 30px 10px;
  }
`

const ExchangePage: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [currentStep, setCurrentStep] = useState<Step>()

  const handleNextStepPress = useCallback(() => {
    if (currentStep === Step.Details) {
      setCurrentStep(Step.Confirm)

      return
    }

    if (currentStep === Step.Confirm) {
      setCurrentStep(Step.Complete)
    }
  }, [currentStep])

  const handleBackStepPress = useCallback(() => {
    if (currentStep === Step.Confirm) {
      setCurrentStep(Step.Details)
    }
  }, [currentStep])

  useEffect(() => {
    let interval: NodeJS.Timer

    if (router.query.id) {
      void dispatch(fetchExchangeInfo(router.query.id as string))

      interval = setInterval(() => {
        void dispatch(fetchExchangeInfo(router.query.id as string))
      }, 30000)
      setCurrentStep(Step.Complete)
    } else {
      setCurrentStep(Step.Details)
    }

    return () => {
      clearInterval(interval)
    }
  }, [router, dispatch])

  return (
    <>
      <Header />
      <StepperWrapper>
        {currentStep ? (
          <>
            <StepsWithModal>
              <TotalStepsWrapper>
                <Steps currentStep={currentStep} />
              </TotalStepsWrapper>
              {currentStep === Step.Confirm && <WarningModal />}
            </StepsWithModal>
            <StepWrapper>
              <MobileSteps currentStep={currentStep} />
              {currentStep === Step.Details && <InfoStep onNextPress={handleNextStepPress} />}
              {currentStep === Step.Confirm && <ConfirmStep onBackStepPress={handleBackStepPress} />}
              {currentStep === Step.Complete && <ExchangeStatus />}
            </StepWrapper>
          </>
        ) : (
          <Loader />
        )}
      </StepperWrapper>
      <Footer />
    </>
  )
}
export default ExchangePage
