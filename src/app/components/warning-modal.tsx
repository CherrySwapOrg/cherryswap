import React from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

import ClickOutsideWrapper from 'app/components/click-outside-wrapper'
import { BREAKPOINTS } from 'helpers/constants'

const Wrapper = styled.div`
  background-color: ${({ theme }): string => theme.colors.primary};
  border-radius: ${({ theme }): string => theme.borderRadius.large};
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  padding: 30px 27px;
  position: relative;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 70px 60px;
  }
`

const Heading = styled.span`
  color: ${({ theme }): string => theme.colors.text.main};
  opacity: 0.8;
`

const Description = styled.span`
  background-color: ${({ theme }): string => theme.colors.text.main};
  border-radius: ${({ theme }): string => theme.borderRadius.small};
  color: ${({ theme }): string => theme.colors.text.dark};
  display: flex;
  font-weight: 700;
  gap: 5px;
  padding: 12px;
`

const MobileClose = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: none;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    background-image: url('/icons/close-icon-white.svg');
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
  }
`

const GreenText = styled.span`
  color: ${({ theme }): string => theme.colors.additionalColors.green};
  display: flex;
  gap: 5px;
`

interface Props {
  onClose?: () => void
}

const WarningModal: React.FC<Props> = ({ onClose }) => (
  <ClickOutsideWrapper setIsOpen={onClose}>
    <Wrapper>
      <MobileClose onClick={onClose} />
      <Heading>Please make sure you are on cherryswap.io</Heading>
      <Description>
        <GreenText>
          <Image width={20} height={20} src='/icons/lock-green.svg' alt='Lock' />
          Secure |{' '}
        </GreenText>
        https://cherryswap.io
      </Description>
    </Wrapper>
  </ClickOutsideWrapper>
)

export default WarningModal
