import React, { useCallback, useState } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

import Link from 'app/components/link'
import Logo from 'app/components/logo'
import mainContainer from 'app/styles/main-container'
import { BREAKPOINTS } from 'helpers/constants'

const Wrapper = styled.header<{ isOpened?: boolean }>`
  ${mainContainer};
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  justify-content: space-between;
  color: ${({ theme, isOpened }): string => (isOpened ? theme.colors.primaryOnDark : theme.colors.text.dark)};
`

const MobileMenu = styled.div<{ isOpened: boolean }>`
  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    background-color: ${({ theme }): string => theme.colors.background.dark};
    bottom: 0;
    left: 0;
    opacity: ${({ isOpened }): string => (isOpened ? '1' : '0')};
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.1s linear;
    visibility: ${({ isOpened }): string => (isOpened ? 'visible' : 'hidden')};
    z-index: 9;
  }
`

const DrawerMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  outline: none;
  z-index: 10;

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    display: block;
  }
`

const LinksWrapper = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 800;
  gap: 53px;
  letter-spacing: 3.5px;
  text-transform: uppercase;

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    color: ${({ theme }): string => theme.colors.text.main};
    margin-top: 100px;
    flex-direction: column;
    gap: 0;
    height: 100%;
    padding: 0 15px;
  }
`

const NavigationLink = styled(Link)<{ isFirst?: boolean }>`
  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    border-top: ${({ isFirst }): string => (isFirst ? '1px' : '0px')} solid
      ${({ theme }): string => theme.colors.text.placeholder}55;
    border-bottom: 1px solid ${({ theme }): string => theme.colors.text.placeholder}55;
    color: ${({ theme }): string => theme.colors.text.main};
    padding: 60px 0;
    text-align: center;
    width: 100%;
  }
`

const Header: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false)

  const toggleMenuOpened = useCallback(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }

    setIsOpened(!isOpened)
  }, [isOpened])

  return (
    <Wrapper isOpened={isOpened}>
      <Logo src={isOpened ? '/icons/dark-logo.svg' : '/icons/light-logo.svg'} />
      <DrawerMenuButton onClick={toggleMenuOpened}>
        {!isOpened ? (
          <Image width={26} height={21} src='/icons/menu-icon.svg' alt='Menu' />
        ) : (
          <Image width={26} height={21} src='/icons/close-icon-white.svg' alt='Menu' />
        )}
      </DrawerMenuButton>
      <MobileMenu isOpened={isOpened}>
        <LinksWrapper>
          <NavigationLink href='/' isFirst>
            About
          </NavigationLink>
          <NavigationLink href='/'>Contact us</NavigationLink>
        </LinksWrapper>
      </MobileMenu>
    </Wrapper>
  )
}

export default Header
