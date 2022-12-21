import React from 'react'

import styled from '@emotion/styled'
import { NextPage } from 'next'

import Footer from 'app/components/footer'
import Header from 'app/components/header'
import InfoPageLayout from 'app/components/info-page-layout'
import Link from 'app/components/link'
import PageBackground from 'app/components/page-background'

const Text = styled.span`
  font-size: 16px;
`

const MailLink = styled(Link)`
  color: ${({ theme }): string => theme.colors.border.primaryOnDark};
`

const ContactUsPage: NextPage = () => (
  <>
    <Header />
    <PageBackground>
      <InfoPageLayout
        heading='Contact Us'
        description='If you have any questions, concerns or suggestions, feel free to contact us.'
      >
        <Text>
          Contact Mail: <MailLink href='mailto:admin@cherryblossomswap.com'>admin@cherryblossomswap.com</MailLink>
        </Text>
      </InfoPageLayout>
    </PageBackground>
    <Footer />
  </>
)

export default ContactUsPage
