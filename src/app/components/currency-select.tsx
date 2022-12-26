import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

import Button from 'app/components/button'
import CurrencyIconAndTicker from 'app/components/currency-icon-and-ticker'
import { useAppSelector } from 'app/store'
import { inputStyle } from 'app/styles/input-style'
import { selectCurrenciesInfo } from 'features/calculator/selectors'
import { CurrencyInfo } from 'features/calculator/types'
import { getCurrencyKey } from 'helpers/get-currency-key'

const SelectWrapper = styled.div`
  max-height: 400px;
`

const HeaderWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`

const SearchWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }): string => theme.colors.background.main};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  display: flex;
  padding: 15px;
  justify-content: space-between;
  margin: 20px 0;
`

const SearchInput = styled.input`
  ${inputStyle};
  font-size: 16px;
  width: 90%;

  ::placeholder {
    color: ${({ theme }): string => theme.colors.text.placeholder};
  }
`

const CloseButton = styled(Button)`
  background: transparent;

  :hover {
    background: transparent;
  }

  :focus {
    background: transparent;
  }
`

const Title = styled.span<{ isPrimary?: boolean }>`
  display: block;
  font-weight: 700;
  color: ${({ theme, isPrimary }): string => (isPrimary ? theme.colors.primary : theme.colors.text.dark)};
  padding: ${({ isPrimary }): string => (isPrimary ? '0' : '10px 0 5px 0')};
`

const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }): string => theme.colors.border.main};
`

const ListWrapper = styled.div`
  max-height: 300px;
  overflow: scroll;
`

const ZeroState = styled.span`
  align-items: center;
  color: ${({ theme }): string => theme.colors.text.dark};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  gap: 5px;
  justify-content: center;
`

interface Props {
  title?: string
  onSelect?: (currency: string) => () => void
  onClose?: () => void
  isOpened?: boolean
}

const isItemInSearch = (searchQuery: string, currency: CurrencyInfo): boolean =>
  currency.ticker?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
  currency.name?.toLowerCase()?.includes(searchQuery.toLowerCase())

const renderItem = (currency: CurrencyInfo, onSelect?: () => void): JSX.Element => (
  <CurrencyWrapper key={getCurrencyKey(currency)} onClick={onSelect}>
    <CurrencyIconAndTicker currencyInfo={currency} />
  </CurrencyWrapper>
)

const CurrencySelect: React.FC<Props> = ({ title, onSelect, onClose, isOpened }) => {
  const currenciesInfo = useAppSelector(selectCurrenciesInfo)

  const [searchQuery, setSearchQuery] = useState('')

  const currenciesList = useMemo(() => Object.values(currenciesInfo), [currenciesInfo])

  const popularCurrencies = useMemo(
    () => currenciesList.filter((currency) => currency.isPopular && isItemInSearch(searchQuery, currency)),
    [currenciesList, searchQuery],
  )

  const otherCurrencies = useMemo(
    () => currenciesList.filter((currency) => !currency.isPopular && isItemInSearch(searchQuery, currency)),
    [currenciesList, searchQuery],
  )

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearchQuery(value)
  }, [])

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose()
      setSearchQuery('')
    }
  }, [onClose])

  return (
    <SelectWrapper>
      <HeaderWrapper>
        <Title isPrimary>{title}</Title>
        <CloseButton onClick={handleClose}>
          <Image width={12} height={12} src='/icons/close-icon.svg' alt='Close' />
        </CloseButton>
      </HeaderWrapper>
      <SearchWrapper>
        <SearchInput value={searchQuery} onChange={handleSearchChange} placeholder='Type a currency' />
        <Image width={18} height={18} src='/icons/search-icon.svg' alt='Search' />
      </SearchWrapper>
      {isOpened && (
        <ListWrapper>
          {!!popularCurrencies.length && <Title>Popular currencies</Title>}
          {popularCurrencies.map((currency) => renderItem(currency, onSelect && onSelect(getCurrencyKey(currency))))}
          {!!otherCurrencies.length && <Title>All currencies</Title>}
          {otherCurrencies.map((currency) => renderItem(currency, onSelect && onSelect(getCurrencyKey(currency))))}
          {!popularCurrencies.length && !otherCurrencies.length && (
            <ZeroState>
              <Image width={15} height={15} src='/icons/empty-search-icon.svg' alt='Empty search' />
              No matches were found for your query
            </ZeroState>
          )}
        </ListWrapper>
      )}
    </SelectWrapper>
  )
}

export default CurrencySelect
