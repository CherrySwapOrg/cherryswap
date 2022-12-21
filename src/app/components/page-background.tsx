import styled from '@emotion/styled'

import { BREAKPOINTS } from 'helpers/constants'

const PageBackground = styled.div`
  background: url('/images/page-background.svg');
  background-position: 0 -85%;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    background-position: 0 -20%;
  }

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    background: none;
  }
`

export default PageBackground
