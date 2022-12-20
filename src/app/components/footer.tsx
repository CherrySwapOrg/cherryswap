import React from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

import Link from 'app/components/link'
import Logo from 'app/components/logo'
import mainContainer from 'app/styles/main-container'
import { BREAKPOINTS } from 'helpers/constants'

const Wrapper = styled.footer`
  background-color: ${({ theme }): string => theme.colors.background.dark};
  padding: 50px 0;

  @media (max-width: ${BREAKPOINTS.tabletSmall}) {
    padding: 40px 0 20px;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    padding: 35px 0 0;
  }
`

const InnerContainer = styled.div`
  ${mainContainer};
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px;

  @media (max-width: ${BREAKPOINTS.tabletSmall}) {
    flex-wrap: wrap;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    padding-bottom: 0;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }): string => theme.colors.text.main};
  gap: 25px;

  @media (max-width: ${BREAKPOINTS.tabletSmall}) {
    flex-basis: 100%;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    gap: 35px;
  }
`

const RightColumn = styled.div`
  display: flex;
  gap: 100px;

  @media (max-width: ${BREAKPOINTS.tabletSmall}) {
    margin: 40px 0 0;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    flex-direction: column;
    gap: 30px;
    margin: 35px 0;
  }
`

const InnerColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SocialLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    display: none;
  }
`

const MobileSocialLinks = styled(SocialLinksWrapper)`
  display: none;

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    display: flex;
    margin-top: 35px;
  }
`

const SocialLink = styled(Link)`
  align-items: center;
  background-color: ${({ theme }): string => theme.colors.background.alternativeDark};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
`

const NavigationHeader = styled.span`
  color: ${({ theme }): string => theme.colors.text.main};
  letter-spacing: 3.5px;
  font-size: 14px;
  font-weight: 700;
  opacity: 0.3;
  text-transform: uppercase;
`

const NavigationLink = styled(Link)`
  color: ${({ theme }): string => theme.colors.text.main};
  font-size: 16px;
  font-weight: 500;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 14px;
  }
`

const Divider = styled.div`
  background-color: ${({ theme }): string => theme.colors.background.main};
  height: 1px;
  opacity: 0.1;
  width: 100%;
  mix-blend-mode: normal;
`

const MobileDivider = styled(Divider)`
  display: none;

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    display: block;
  }
`

const LinksContainer = styled.div`
  align-items: baseline;
  display: flex;
  gap: 40px;

  @media (max-width: ${BREAKPOINTS.tabletSmall}) {
    justify-content: center;
    flex-basis: 100%;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    justify-content: flex-start;
    padding: 35px 0;
  }
`

const Copyright = styled.span`
  align-self: flex-end;
  color: ${({ theme }): string => theme.colors.text.main};
  opacity: 0.4;

  @media (max-width: ${BREAKPOINTS.tabletSmall}) {
    font-size: 15px;
    margin: 25px auto 0;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    font-size: 13px;
    margin: 25px 0;
  }
`

const StatusLink = styled(Link)`
  align-items: center;
  border: 1px solid ${({ theme }): string => theme.colors.border.primaryOnDark};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  color: ${({ theme }): string => theme.colors.border.primaryOnDark};
  display: flex;
  gap: 7px;
  padding: 8px 16px;
`

const Footer: React.FC = () => (
  <Wrapper>
    <InnerContainer>
      <LeftColumn>
        <Logo src='/icons/dark-logo.svg' fontSize='20px' logoSize={53} />
        <SocialLinksWrapper>
          <SocialLink href='/'>
            <Image width={10} height={20} src='/icons/social/facebook.svg' alt='Facebook' />
          </SocialLink>
          <SocialLink href='/'>
            <Image width={20} height={16} src='/icons/social/twitter.svg' alt='Twitter' />
          </SocialLink>
          <SocialLink href='/'>
            <Image width={20} height={20} src='/icons/social/instagram.svg' alt='Instagram' />
          </SocialLink>
        </SocialLinksWrapper>
        <MobileDivider />
      </LeftColumn>
      <RightColumn>
        <InnerColumn>
          <NavigationHeader>Cherry swap</NavigationHeader>
          <NavigationLink href='/about'>About us</NavigationLink>
          <NavigationLink href='/contact-us'>Contact us</NavigationLink>
          <NavigationLink href='/terms-of-use'>Terms of Use</NavigationLink>
          <NavigationLink href='/privacy-policy'>Privacy Policy</NavigationLink>
        </InnerColumn>
        <InnerColumn>
          <NavigationHeader>Support</NavigationHeader>
          <NavigationLink href='/'>How it Works</NavigationLink>
          <NavigationLink href='/'>KYC/AML</NavigationLink>
          <StatusLink href='/exchange-status'>
            Transaction Status{' '}
            <Image width={20} height={20} src='/icons/arrow-circle-right-icon.svg' alt='Arrow right' />
          </StatusLink>
        </InnerColumn>
      </RightColumn>
    </InnerContainer>
    <InnerContainer>
      <Divider />
    </InnerContainer>
    <InnerContainer>
      <MobileSocialLinks>
        <SocialLink href='/'>
          <Image width={10} height={20} src='/icons/social/facebook.svg' alt='Facebook' />
        </SocialLink>
        <SocialLink href='/'>
          <Image width={20} height={16} src='/icons/social/twitter.svg' alt='Twitter' />
        </SocialLink>
        <SocialLink href='/'>
          <Image width={20} height={20} src='/icons/social/instagram.svg' alt='Instagram' />
        </SocialLink>
      </MobileSocialLinks>
      <LinksContainer>
        <Link href='/'>
          <Image width={163} height={40} src='/icons/social/trustpilot.svg' alt='Trustpilot' />
        </Link>
        <Link href='/'>
          <Image width={115} height={24} src='/icons/social/bestchange.svg' alt='Trustpilot' />
        </Link>
      </LinksContainer>
      <MobileDivider />
      <Copyright>Copyright © 2022 Cherry Swap. All rights reserved.</Copyright>
    </InnerContainer>
  </Wrapper>
)

export default Footer
