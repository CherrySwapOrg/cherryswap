import React from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

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

const StepWrapper = styled.div<{ isActive?: boolean; isCompleted?: boolean; flexDirection?: string; gap?: string }>`
  align-items: center;
  border-radius: ${({ theme }): string => theme.borderRadius.small};
  color: ${({ theme, isActive }): string => (isActive ? theme.colors.primary : theme.colors.text.placeholder)};
  display: flex;
  font-size: inherit;
  font-weight: 800;
  gap: ${({ gap }): string => gap || '0'};
  justify-content: space-between;
  flex-direction: ${({ flexDirection }): string => flexDirection || 'row'};

  div,
  span {
    text-align: center;
    opacity: ${({ isCompleted, isActive }): string => (isCompleted || isActive ? '1' : '0.3')};
  }
`

interface Props {
  title?: string
  isActive?: boolean
  isCompleted?: boolean
  flexDirection?: string
  gap?: string
}

const StatusDot: React.FC<Props> = ({ title, isActive, isCompleted, flexDirection, gap }) => (
  <StepWrapper isActive={isActive} isCompleted={isCompleted} flexDirection={flexDirection} gap={gap}>
    <span>{title}</span>
    <StepIconWrapper isActive={isActive}>
      {isActive && <Image fill src='/icons/active-step-icon.svg' alt={title || ''} />}
      {isCompleted && <Image fill src='/icons/checkmark-icon-white.svg' alt={title || ''} />}
    </StepIconWrapper>
  </StepWrapper>
)

export default StatusDot
