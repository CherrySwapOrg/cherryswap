import React, { memo } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

import { CurrencyInfo } from 'features/calculator/types'
import { BREAKPOINTS } from 'helpers/constants'
import { isHiddenNetworkLabel } from 'helpers/is-hidden-network-label'

const ImageWrapper = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
`

const CurrencyTicker = styled.span`
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  margin-left: 10px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 16px;
  }
`

const CurrencyNetwork = styled.span`
  background: ${({ theme }): string => theme.colors.background.dark};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  color: ${({ theme }): string => theme.colors.text.main};
  display: flex;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  margin-left: 5px;
  padding: 3px 6px;
`

interface Props {
  currencyInfo: CurrencyInfo
}

const CurrencyIconAndTicker: React.FC<Props> = ({ currencyInfo }) => (
  <>
    <ImageWrapper>
      <Image fill src={currencyInfo.icon} alt={currencyInfo.name} />
    </ImageWrapper>
    <CurrencyTicker>{currencyInfo.ticker}</CurrencyTicker>
    {!isHiddenNetworkLabel(currencyInfo) && <CurrencyNetwork>{currencyInfo.network}</CurrencyNetwork>}
  </>
)

const isEqualProps = (prev: Props, next: Props): boolean =>
  prev.currencyInfo.ticker === next.currencyInfo.ticker && prev.currencyInfo.network === next.currencyInfo.network

export default memo(CurrencyIconAndTicker, isEqualProps)
