const NUM_REGEXP = /^\d*[.]?(\d*)$/

export default function validateNumericString(num: string, maxDecimals?: number): boolean {
  const isValid = NUM_REGEXP.test(num)
  const match = NUM_REGEXP.exec(num)

  if (maxDecimals !== undefined && match?.[1]) {
    return isValid && match?.[1].length <= maxDecimals
  }

  return isValid
}
