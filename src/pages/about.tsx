import React from 'react'

import { NextPage } from 'next'

import Footer from 'app/components/footer'
import Header from 'app/components/header'
import InfoPageLayout from 'app/components/info-page-layout'

const AboutPage: NextPage = () => (
  <>
    <Header />
    <InfoPageLayout
      heading='About Us'
      description='Vivamus in tincidunt elit. Sed id elementum erat. Pellentesque vel dui porta, sagittis velit in, pretium nunc. Donec viverra vel ipsum a maximus. Donec nibh ex, lobortis in.'
    />
    <Footer />
  </>
)

export default AboutPage
