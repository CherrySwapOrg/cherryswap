import React from 'react'

import styled from '@emotion/styled'

import StatusDot from 'app/components/status-dot'
import { BREAKPOINTS } from 'helpers/constants'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: ${BREAKPOINTS.mobileLarge}) {
    font-size: 11px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    gap: 15px;
  }
`

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

interface Props {
  status: string
}

const ExchangeProgress: React.FC<Props> = ({ status }) => (
  <Wrapper>
    <StatusWrapper>
      <StatusDot
        title='Awaiting deposit'
        isActive={status === 'waiting'}
        isCompleted={status !== 'waiting'}
        flexDirection='column-reverse'
        gap='5px'
      />
    </StatusWrapper>
    <StatusWrapper>
      <StatusDot
        title='Confirming'
        isActive={status === 'confirming'}
        isCompleted={status !== 'confirming' && status !== 'waiting'}
        flexDirection='column-reverse'
        gap='5px'
      />
    </StatusWrapper>
    <StatusWrapper>
      <StatusDot
        title='Exchanging'
        flexDirection='column-reverse'
        gap='5px'
        isActive={status === 'exchanging'}
        isCompleted={status !== 'confirming' && status !== 'waiting' && status !== 'exchanging'}
      />
    </StatusWrapper>
    <StatusWrapper>
      <StatusDot
        title='Sending to you'
        flexDirection='column-reverse'
        gap='5px'
        isActive={status === 'sending'}
        isCompleted={status !== 'confirming' && status !== 'waiting' && status !== 'exchanging' && status !== 'sending'}
      />
    </StatusWrapper>
  </Wrapper>
)

export default ExchangeProgress
