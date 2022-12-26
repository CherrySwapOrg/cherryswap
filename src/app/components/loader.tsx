import React from 'react'

import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const loadingAnimation = keyframes`
  0% {
    background-position: 62% 12%;
  }
  12.5% {
    background-position: 87% 37%;
  }
  25% {
    background-position: 87% 62%;
  }
  37.5% {
    background-position: 62% 87%;
  }
  50% {
    background-position: 37% 87%;
  }
  62.5% {
    background-position: 12% 62%;
  }
  75% {
    background-position: 12% 37%;
  }
  87.5% {
    background-position: 37% 37%;
  }
  100% {
    background-position: 62% 12%;
  }
`

const LoaderWrapper = styled.div<{ size?: string }>`
  width: ${({ size }): string => size || '35px'};
  height: ${({ size }): string => size || '35px'};
  background: radial-gradient(circle, rgba(188, 36, 74, 1) 20%, rgba(188, 36, 74, 0.2) 100%) no-repeat;
  background-size: 200% 200%;
  mask-image: url('/icons/loader.svg');
  mask-size: 100%;
  mask-mode: alpha;
  animation: ${loadingAnimation} 1s infinite;
  animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1, 0.1);
`

interface Props {
  size?: string
}

const Loader: React.FC<Props> = ({ size }) => <LoaderWrapper size={size} />

export default Loader
