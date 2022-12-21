import React from 'react'

import styled from '@emotion/styled'
import { NextPage } from 'next'

import Footer from 'app/components/footer'
import Header from 'app/components/header'
import InfoPageLayout from 'app/components/info-page-layout'
import PageBackground from 'app/components/page-background'

const Text = styled.span`
  font-size: 16px;
`

const AboutPage: NextPage = () => (
  <>
    <Header />
    <PageBackground>
      <InfoPageLayout
        heading='About Us'
        description='Vivamus in tincidunt elit. Sed id elementum erat. Pellentesque vel dui porta, sagittis velit in, pretium nunc. Donec viverra vel ipsum a maximus. Donec nibh ex, lobortis in.'
      >
        <Text>
          CherrySwap is a fast growing service that offers users fast and profitable exchanges. The success of the work
          is based on the prompt work of specialists, a user-friendly interface, and mutually beneficial courses. Every
          minute, on the service, digital and electronic currencies are exchanged, in which many users receive passive
          income through our Affiliate Program.
        </Text>
      </InfoPageLayout>
    </PageBackground>
    <Footer />
  </>
)

export default AboutPage
