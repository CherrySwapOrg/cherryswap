import BN, { BigNumber } from 'bignumber.js'

import { ConfigService } from 'services/ConfigService'

BN.config({
  DECIMAL_PLACES: 20,
  EXPONENTIAL_AT: 30,
  FORMAT: {
    prefix: '',
    decimalSeparator: ConfigService.numberFormattingConfig.decimalSeparator,
    groupSeparator: ConfigService.numberFormattingConfig.groupSeparator,
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0,
    suffix: '',
  },
})

export const isNumberOrNumberString = (val: number | string | undefined): boolean => !!val && !new BN(val).isNaN()

export const abs = (amount: BN.Value): BigNumber => new BN(amount || '0').abs()

export const eq = (number: BN.Value, value: BN.Value): boolean => {
  try {
    return new BN(number).eq(value)
  } catch (err) {
    return false
  }
}

export const gt = (number: BN.Value, value: BN.Value): boolean => {
  try {
    return new BN(number).gt(value)
  } catch (err) {
    return false
  }
}

export const minimum = (...args: BN.Value[]): string | boolean => {
  try {
    return BN.minimum(...args).toString()
  } catch (err) {
    return false
  }
}

export const maximum = (...args: BN.Value[]): string | boolean => {
  try {
    return BN.maximum(...args).toString()
  } catch (err) {
    return false
  }
}

export const gte = (number: BN.Value, value: BN.Value): string | boolean => {
  try {
    return new BN(number).gte(value)
  } catch (err) {
    return false
  }
}

export const lte = (number: BN.Value, value: BN.Value): string | boolean => {
  try {
    return new BN(number).lte(value)
  } catch (err) {
    return false
  }
}

export const lt = (number: BN.Value, value: BN.Value): string | boolean => {
  try {
    return new BN(number).lt(value)
  } catch (err) {
    return false
  }
}

export const plus = (number: BN.Value, value: BN.Value): BigNumber => {
  try {
    return new BN(number).plus(value)
  } catch (err) {
    return new BN('0')
  }
}

export const minus = (number: BN.Value, value: BN.Value): BigNumber => {
  try {
    return new BN(number).minus(value)
  } catch (err) {
    return new BN('0')
  }
}

export const multipliedBy = (number: BN.Value, value: BN.Value): BigNumber => {
  try {
    return new BN(number).multipliedBy(new BN(value))
  } catch (err) {
    return new BN('0')
  }
}

export const dividedBy = (number: BN.Value, value: BN.Value): BigNumber => {
  try {
    return new BN(number).dividedBy(new BN(value))
  } catch (err) {
    return new BN('0')
  }
}

export const getRemainder = (number: BN.Value, value: BN.Value): BigNumber => {
  try {
    return new BN(number).modulo(new BN(value))
  } catch (err) {
    return new BN('0')
  }
}

export const formatAmount = (amount: BN.Value, decimals: number): string => {
  const value = new BN(String(amount).slice(0, 14) || '0').toFormat()

  if (decimals) {
    return value.slice(0, decimals)
  }

  return value
}

export const truncateAmount = (amount: BN.Value, decimals: number): string =>
  plus(new BN(amount).decimalPlaces(decimals, 1), '0').toString()

export const formatNumber = (val: BN.Value): string => {
  try {
    return new BN(val).toFormat()
  } catch (err) {
    return '0'
  }
}

export const getFormattedLargeValue = (value: string): string => {
  const intPart = value
    .toString()
    .replaceAll(ConfigService.numberFormattingConfig.groupSeparator, '')
    .split(ConfigService.numberFormattingConfig.decimalSeparator)[0]
    .replace(/\s/g, '')

  // value > 100 000 000 000 => 100 B
  if (intPart.length > 11) {
    return `${new BN(intPart.slice(0, -7)).dividedBy(100).toFormat()} B`
  }

  // value > 10 000 000 => 10 M
  if (intPart.length > 7) {
    return `${new BN(intPart.slice(0, -4)).dividedBy(100).toFormat()} M`
  }

  // cut fractional part to make max value length - 14 (+1 dot sign)
  if (value.replace(/\s/g, '').length > 15) {
    return new BN(value.replace(/\s/g, '')).toFormat(12 - intPart.length)
  }

  return value
}

export const formatInputValue = (value: string): string => {
  let formattedValue = value.replace('~ ', '')

  if (/,/.test(formattedValue)) {
    formattedValue = value.replace(',', '.')
  }

  if (formattedValue.startsWith('.')) {
    return '0.'
  }

  if (formattedValue.startsWith('0') && !formattedValue.startsWith('0.')) {
    return new BN(formattedValue).toString()
  }

  return formattedValue
}
