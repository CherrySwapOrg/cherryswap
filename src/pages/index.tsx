import styled from '@emotion/styled'
import type { NextPage } from 'next'

import CalculatorForm from 'app/components/calculator-form'
import Footer from 'app/components/footer'
import Header from 'app/components/header'
import PageBackground from 'app/components/page-background'
import PageDescriptionText from 'app/components/page-description-text'
import PageLargeTitle from 'app/components/page-large-title'
import mainContainer from 'app/styles/main-container'
import { BREAKPOINTS } from 'helpers/constants'

const MainPageWrapper = styled.section`
  ${mainContainer};
  min-height: calc(100vh - 100px);
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 1.2;
  padding: 50px 0 150px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    min-height: 0;
    padding: 40px 0;
    gap: 40px;
    flex-direction: column;
  }
`

const PageDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 43%;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    max-width: 100%;
  }
`

const IndexPage: NextPage = () => (
  <>
    <Header />
    <PageBackground>
      <MainPageWrapper>
        <PageDescriptionWrapper>
          <PageLargeTitle title='Exchange Cryptocurrency Instantly' label='Best Rates' />
          <PageDescriptionText
            text='Instant and unlimited exchange between 500+ assets in the world of cryptocurrencies.
Enjoy fast swaps on a non&#8209;custodial exchange platform.'
          />
        </PageDescriptionWrapper>
        <CalculatorForm />
      </MainPageWrapper>
    </PageBackground>
    <Footer />
  </>
)

export default IndexPage
