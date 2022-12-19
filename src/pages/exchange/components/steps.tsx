import React, { useCallback, useMemo } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

import { Step } from 'types/exchange'

const StepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 30px 15px;
`

const StepIconWrapper = styled.div<{ isActive?: boolean }>`
  background-color: ${({ theme, isActive }): string =>
    isActive ? theme.colors.primary : theme.colors.text.placeholder};
  border-radius: 50%;
  position: relative;
  height: 30px;
  width: 30px;

  & > img {
    transform: scale(0.5);
  }
`

const StepWrapper = styled.div<{ isActive?: boolean; isCompleted?: boolean }>`
  align-items: center;
  background-color: ${({ theme }): string => theme.colors.background.main};
  border-radius: ${({ theme }): string => theme.borderRadius.small};
  color: ${({ theme, isActive }): string => (isActive ? theme.colors.primary : theme.colors.text.placeholder)};
  display: flex;
  font-size: 15px;
  font-weight: 800;
  justify-content: space-between;
  padding: 22px 20px;

  div,
  span {
    opacity: ${({ isCompleted, isActive }): string => (isCompleted || isActive ? '1' : '0.3')};
  }
`

interface Props {
  currentStep: Step
}

const Steps: React.FC<Props> = ({ currentStep }) => {
  const isActiveStep = useCallback((step: Step) => currentStep === step, [currentStep])

  const isCompletedDetailsStep = useMemo(
    () => isActiveStep(Step.Confirm) || isActiveStep(Step.Complete),
    [isActiveStep],
  )

  return (
    <StepsWrapper>
      <StepWrapper isActive={isActiveStep(Step.Details)} isCompleted={isCompletedDetailsStep}>
        <span>Enter exchange details</span>
        <StepIconWrapper isActive={isActiveStep(Step.Details)}>
          {isActiveStep(Step.Details) && <Image fill src='/icons/active-step-icon.svg' alt={Step.Details} />}
          {isCompletedDetailsStep && <Image fill src='/icons/checkmark-icon-white.svg' alt={Step.Details} />}
        </StepIconWrapper>
      </StepWrapper>
      <StepWrapper isActive={isActiveStep(Step.Confirm)} isCompleted={isActiveStep(Step.Complete)}>
        <span>Confirm exchange</span>
        <StepIconWrapper isActive={isActiveStep(Step.Confirm)}>
          {isActiveStep(Step.Confirm) && <Image fill src='/icons/active-step-icon.svg' alt={Step.Details} />}
          {isActiveStep(Step.Complete) && <Image fill src='/icons/checkmark-icon-white.svg' alt={Step.Details} />}
        </StepIconWrapper>
      </StepWrapper>
      <StepWrapper isActive={isActiveStep(Step.Complete)}>
        <span>Complete exchange</span>
        <StepIconWrapper isActive={isActiveStep(Step.Complete)}>
          {isActiveStep(Step.Complete) && <Image fill src='/icons/active-step-icon.svg' alt={Step.Details} />}
        </StepIconWrapper>
      </StepWrapper>
    </StepsWrapper>
  )
}

export default Steps
