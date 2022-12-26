import styled from '@emotion/styled'

import { BREAKPOINTS } from 'helpers/constants'

const PageBackground = styled.div`
  background: url('/images/page-background.svg');
  background-repeat: no-repeat space;
  background-position: 0 -100%;
  background-size: 100%, 100vh;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    background-position: 0 -20%;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    background: none;
  }
`

export default PageBackground
