import React from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

const LogoWrapper = styled.div<{ zIndex?: number }>`
  position: relative;
  display: flex;
  z-index: ${({ zIndex }): number => zIndex || 1};
`

const TextWrapper = styled.div<{ fontSize?: string; textColor?: string }>`
  display: flex;
  flex-direction: column;
  font-size: ${({ fontSize }): string => fontSize || '24px'};
  justify-content: center;
  margin-left: 10px;
  color: ${({ theme, textColor }): string => textColor || theme.colors.text.dark};
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
  textColor?: string
  zIndex?: number
}

const Logo: React.FC<Props> = ({ logoSize, fontSize, src, textColor, zIndex }) => (
  <LogoWrapper zIndex={zIndex}>
    <Image width={logoSize || 60} height={logoSize || 60} src={src || '/icons/light-logo.svg'} alt='Cherry swap' />
    <TextWrapper fontSize={fontSize} textColor={textColor}>
      <LogoText>Cherry</LogoText>
      <LogoText>swap</LogoText>
    </TextWrapper>
  </LogoWrapper>
)

export default Logo
