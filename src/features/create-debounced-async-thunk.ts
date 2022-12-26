// based on:
// https://stackoverflow.com/questions/68281810/how-to-debounce-createasyncthunk-from-redux-toolkit

import { createAsyncThunk, AsyncThunkPayloadCreator, AsyncThunk } from '@reduxjs/toolkit'

type DebounceSettings = {
  wait: number

  /**
   * The maximum time `payloadCreator` is allowed to be delayed before
   * it's invoked.
   * @defaultValue `0`
   */
  maxWait?: number
  /**
   * Specify invoking on the leading edge of the timeout.
   * @defaultValue `false`
   */
  leading?: boolean
}

/**
 * A debounced analogue of the `createAsyncThunk` from `@reduxjs/toolkit`
 * @param typePrefix - a string action type value
 * @param options - debounce settings with wait field in milliseconds.
 * @param payloadCreator - a callback function that should return a promise containing the result
 *   of some asynchronous logic
 * @param options - the options object
 */
const createDebouncedAsyncThunk = <Returned, ThunkArg = void>(
  typePrefix: string,
  options: DebounceSettings,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, { rejectValue: string }>,
): AsyncThunk<Returned, ThunkArg, object> => {
  const { maxWait = 0, leading = false } = options ?? {}
  let timer = 0
  let maxTimer = 0
  let resolve: ((value: boolean) => void) | undefined
  const invoke = (): void => {
    window.clearTimeout(maxTimer)
    maxTimer = 0

    if (resolve) {
      resolve(true)
      resolve = undefined
    }
  }
  const cancel = (): void => {
    if (resolve) {
      resolve(false)
      resolve = undefined
    }
  }

  return createAsyncThunk<Returned, ThunkArg>(typePrefix, payloadCreator as never, {
    condition() {
      const immediate = leading && !timer
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        invoke()
        timer = 0
      }, options.wait)

      if (immediate) return true

      cancel()

      if (maxWait && !maxTimer) maxTimer = window.setTimeout(invoke, maxWait)

      return new Promise<boolean>((res) => {
        resolve = res
      })
    },
  })
}

/*
  Then debouncedAsyncThunk rejected it throws ConditionError
*/
export const isConditionError = (
  toBeDetermined: unknown,
): toBeDetermined is { name: 'ConditionError'; message: string } =>
  (toBeDetermined as { name: 'ConditionError'; message: string })?.name === 'ConditionError'

export default createDebouncedAsyncThunk
