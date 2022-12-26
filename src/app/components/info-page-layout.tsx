import React, { PropsWithChildren } from 'react'

import styled from '@emotion/styled'

import { BREAKPOINTS } from 'helpers/constants'

const Wrapper = styled.div``

const ChildrenWrapper = styled.div`
  max-width: 700px;
  padding: 50px 0;
  margin: 0 auto;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 30px;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    padding: 30px 16px;
  }
`

const HeadingWrapper = styled.div`
  background-color: ${({ theme }): string => theme.colors.primary};
  padding: 45px 0;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 30px;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    padding: 30px 16px;
  }
`

const HeadingInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;
`

const Heading = styled.h1`
  color: ${({ theme }): string => theme.colors.text.main};
  font-size: 64px;
  font-weight: 700;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 36px;
  }
`

const Description = styled.span`
  color: ${({ theme }): string => theme.colors.text.main};
  font-size: 18px;
  opacity: 0.8;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 14px;
  }
`

interface Props {
  heading: string
  description?: string
}

const InfoPageLayout: React.FC<PropsWithChildren<Props>> = ({ heading, description, children }) => (
  <Wrapper>
    <HeadingWrapper>
      <HeadingInnerWrapper>
        <Heading>{heading}</Heading>
        {!!description && <Description>{description}</Description>}
      </HeadingInnerWrapper>
    </HeadingWrapper>
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </Wrapper>
)

export default InfoPageLayout
