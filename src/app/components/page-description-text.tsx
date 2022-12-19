import React from 'react'

import styled from '@emotion/styled'

import { BREAKPOINTS } from 'helpers/constants'

const Text = styled.p`
  color: ${({ theme }): string => theme.colors.text.dark};
  font-size: 18px;
  line-height: 1.7;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 16px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 14px;
  }
`

interface Props {
  text: string
}

const PageDescriptionText: React.FC<Props> = ({ text }) => <Text>{text}</Text>

export default PageDescriptionText
