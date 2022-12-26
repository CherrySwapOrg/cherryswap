import React from 'react'

import styled from '@emotion/styled'

import { BREAKPOINTS } from 'helpers/constants'

const Title = styled.h1`
  color: ${({ theme }): string => theme.colors.text.dark};
  font-size: 64px;
  font-weight: 700;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 39px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 36px;
  }
`

const Label = styled.span`
  background-color: ${({ theme }): string => theme.colors.primary};
  border-radius: ${({ theme }): string => theme.borderRadius.small};
  color: ${({ theme }): string => theme.colors.text.main};
  display: flex;
  font-size: 14px;
  font-weight: 800;
  padding: 7px 16px;
  text-transform: uppercase;
  width: fit-content;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 11px;
  }
`

interface Props {
  title: string
  label?: string
}

const PageLargeTitle: React.FC<Props> = ({ title, label }) => (
  <>
    {!!label && <Label>{label}</Label>}
    <Title>{title}</Title>
  </>
)

export default PageLargeTitle
