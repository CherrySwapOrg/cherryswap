import React from 'react'

import styled from '@emotion/styled'

import { BREAKPOINTS } from 'helpers/constants'
import { Step } from 'types/exchange'

const StepsWrapper = styled.div`
  align-items: center;
  display: none;
  width: 100%;
  margin-bottom: 35px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: flex;
  }
`

const StepCounter = styled.span<{ isActive?: boolean }>`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isActive }): string =>
    isActive ? theme.colors.primary : theme.colors.background.main};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  color: ${({ theme, isActive }): string => (isActive ? theme.colors.text.main : theme.colors.text.placeholder)};
  font-size: 13px;
  font-weight: 700;
  width: 100%;
  min-width: 60px;
  height: 26px;
  display: flex;
`

const Line = styled.div<{ isActive?: boolean }>`
  background-color: ${({ theme, isActive }): string =>
    isActive ? theme.colors.primary : theme.colors.background.main};
  display: flex;
  height: 3px;
  width: 100%;
`

const StepHeading = styled.h1`
  color: ${({ theme }): string => theme.colors.primary};
  display: none;
  font-size: 16px;
  margin: 0 0 15px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: block;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 14px;
  }
`

interface Props {
  currentStep: Step
}

const getStepHeading = (currentStep: Step): string => {
  switch (currentStep) {
    case Step.Confirm:
      return 'Confirm exchange'
    case Step.Complete:
      return 'Complete exchange'
    default:
      return 'Exchange amount'
  }
}

const MobileSteps: React.FC<Props> = ({ currentStep }) => (
  <>
    <StepHeading>{getStepHeading(currentStep)}</StepHeading>
    <StepsWrapper>
      <Line isActive />
      <StepCounter isActive>Step 1</StepCounter>
      <Line isActive={currentStep === Step.Confirm || currentStep === Step.Complete} />
      <StepCounter isActive={currentStep === Step.Confirm || currentStep === Step.Complete}>Step 2</StepCounter>
      <Line isActive={currentStep === Step.Complete} />
      <StepCounter isActive={currentStep === Step.Complete}>Step 3</StepCounter>
      <Line isActive={currentStep === Step.Complete} />
    </StepsWrapper>
  </>
)

export default MobileSteps
