import React from 'react'

import styled from '@emotion/styled'

import { BREAKPOINTS } from 'helpers/constants'

const Title = styled.h2<{ margin?: string }>`
  color: ${({ theme }): string => theme.colors.text.placeholder};
  margin: ${({ margin }): string => margin || '0 0 20px'};

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    font-size: 18px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 14px;
  }
`

interface Props {
  title: string
  margin?: string
}

const StepperHeading: React.FC<Props> = ({ title, margin }) => <Title margin={margin}>{title}</Title>

export default StepperHeading
