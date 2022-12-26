import React, { memo, PropsWithChildren } from 'react'

import styled from '@emotion/styled'

import { BREAKPOINTS } from 'helpers/constants'

const SubsectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 13px 0;
  width: 100%;
  position: relative;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 8px 0;
    gap: 5px;
  }
`

const Heading = styled.span`
  color: ${({ theme }): string => theme.colors.text.dark};
  opacity: 0.5;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 12px;
  }
`

const Value = styled.span`
  color: ${({ theme }): string => theme.colors.text.dark};
  font-size: 16px;
  font-weight: 600;
  word-wrap: break-word;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 14px;
    letter-spacing: 1px;
  }
`

const BigValue = styled(Value)<{ fontSize?: number }>`
  font-size: ${({ fontSize }): number => fontSize || 34}px;
  font-weight: 800;
  text-transform: uppercase;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 24px;
  }
`

interface Props {
  title: string
  value?: string
  bigValue?: string
  fontSize?: number
}

const InfoSection: React.FC<PropsWithChildren<Props>> = ({ title, value, bigValue, fontSize, children }) => (
  <SubsectionWrapper>
    <Heading>{title}</Heading>
    {value && <Value>{value}</Value>}
    {bigValue && <BigValue fontSize={fontSize}>{bigValue}</BigValue>}
    {children}
  </SubsectionWrapper>
)

const isEqualProps = (prev: Props, next: Props): boolean =>
  prev.title === next.title && prev.bigValue === next.bigValue && prev.value === next.value

export default memo(InfoSection, isEqualProps)
