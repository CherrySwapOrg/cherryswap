import React from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  z-index: 10;
`

const TextWrapper = styled.div<{ fontSize?: string }>`
  display: flex;
  flex-direction: column;
  font-size: ${({ fontSize }): string => fontSize || '24px'};
  justify-content: center;
  margin-left: 10px;
`

const LogoText = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  line-height: 26px;
`

interface Props {
  logoSize?: number
  fontSize?: string
  src?: string
}

const Logo: React.FC<Props> = ({ logoSize, fontSize, src }) => (
  <LogoWrapper>
    <Image width={logoSize || 60} height={logoSize || 60} src={src || '/icons/light-logo.svg'} alt='Cherry swap' />
    <TextWrapper fontSize={fontSize}>
      <LogoText>Cherry</LogoText>
      <LogoText>swap</LogoText>
    </TextWrapper>
  </LogoWrapper>
)

export default Logo
