import React, { PropsWithChildren } from 'react'

import styled from '@emotion/styled'

import { BREAKPOINTS } from 'helpers/constants'

const Wrapper = styled.div`
  position: absolute;
  z-index: 5;
  bottom: 30px;
  left: -10px;
`

const Arrow = styled.div`
  width: 36px;
  height: 36px;
  position: relative;
  z-index: 6;
  background: ${({ theme }): string => theme.colors.background.light};
  transform: rotate(45deg);

  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 16px;
    height: 16px;
  }
`

const Content = styled.div`
  width: 260px;
  position: absolute;
  z-index: 5;
  left: -110px;
  bottom: 18px;
  padding: 30px;
  background: ${({ theme }): string => theme.colors.background.light};
  border-radius: 20px;
  box-shadow: ${({ theme }): string => theme.boxShadow.primary};

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 10px;
    bottom: 8px;
    left: -90px;
    width: 200px;
  }
`

const Title = styled.h5`
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }): string => theme.colors.primary};
  opacity: 0.8;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    margin-bottom: 12px;
    font-size: 12px;
  }
`
const Text = styled.p`
  text-align: center;
  color: ${({ theme }): string => theme.colors.text.dark};

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 10px;
  }
`

interface Props {
  title: string
  text?: string
}

const HoverPopUp: React.FC<PropsWithChildren<Props>> = ({ title, text }) => (
  <Wrapper>
    <Arrow />
    <Content>
      <Title>{title}</Title>
      <Text>{text}</Text>
    </Content>
  </Wrapper>
)

export default HoverPopUp
