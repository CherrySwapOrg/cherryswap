import React from 'react'

import { css, SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

import { BREAKPOINTS } from 'helpers/constants'

const openedErrorMessage = css`
  top: -30px;
  visibility: visible;
  opacity: 1;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    top: -25px;
  }
`

const closedErrorMessage = css`
  top: 0;
  visibility: hidden;
  opacity: 0;
`

const ErrorWrapper = styled.div<{ isOpened: boolean }>`
  background-color: ${({ theme }): string => theme.colors.text.placeholder};
  border-radius: ${({ theme }): string => `${theme.borderRadius.normal} ${theme.borderRadius.normal} 0 0`};
  color: ${({ theme }): string => theme.colors.text.main};
  padding: 5px 20px 20px;
  position: absolute;
  left: 0;
  transition: all 0.2s linear;
  width: 100%;
  z-index: 1;
  ${({ isOpened }): SerializedStyles => (isOpened ? openedErrorMessage : closedErrorMessage)};

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 11px;
  }
`

interface Props {
  isShown?: boolean
  errorMessage?: string
}

const InputErrorMessage: React.FC<Props> = ({ isShown, errorMessage }) => (
  <ErrorWrapper isOpened={!!isShown}>{errorMessage}</ErrorWrapper>
)

export default InputErrorMessage
