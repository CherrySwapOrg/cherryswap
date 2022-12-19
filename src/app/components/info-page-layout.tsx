import React, { PropsWithChildren } from 'react'

import styled from '@emotion/styled'

const Wrapper = styled.div``

const ChildrenWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

const HeadingWrapper = styled.div`
  background-color: ${({ theme }): string => theme.colors.primary};
  padding: 45px 0;
`

const HeadingInnerWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

const Heading = styled.h1`
  color: ${({ theme }): string => theme.colors.text.main};
  font-size: 64px;
  font-weight: 700;
  text-align: center;
`

const Description = styled.span`
  color: ${({ theme }): string => theme.colors.text.main};
  font-size: 18px;
  opacity: 0.8;
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
