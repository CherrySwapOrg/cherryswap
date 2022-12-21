import React, { PropsWithChildren } from 'react'

import styled from '@emotion/styled'

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
  background: #ffffff;
  transform: rotate(45deg);
`

const Content = styled.div`
  width: 260px;
  position: absolute;
  z-index: 5;
  left: -110px;
  bottom: 18px;
  padding: 30px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 10px 16px 74px rgba(156, 46, 73, 0.2);
`

const Title = styled.h5`
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }): string => theme.colors.primary};
  opacity: 0.8;
`
const Text = styled.p`
  text-align: center;
  color: ${({ theme }): string => theme.colors.text.dark};
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
