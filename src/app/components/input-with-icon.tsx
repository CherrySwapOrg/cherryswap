import React, { ChangeEvent } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

import InputErrorMessage from 'app/components/input-error-message'
import { inputStyle } from 'app/styles/input-style'
import { BREAKPOINTS } from 'helpers/constants'

const Wrapper = styled.div`
  position: relative;
`

const InputWrapper = styled.div<{ padding?: string; isError?: boolean }>`
  align-items: center;
  background-color: ${({ theme }): string => theme.colors.background.main};
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  border: 1px solid
    ${({ theme, isError }): string => (isError ? theme.colors.text.placeholder : theme.colors.background.main)};
  display: flex;
  padding: ${({ padding }): string => padding || '15px'};
  transition: all 0.1s linear;
  justify-content: space-between;
  position: relative;
  z-index: 2;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px 10px;
  }
`

const Input = styled.input`
  ${inputStyle};
  font-size: 16px;
  font-weight: 600;
  width: 90%;

  ::placeholder {
    color: ${({ theme }): string => theme.colors.text.placeholder};
    font-weight: 600;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 13px;
  }
`

const IconWrapper = styled.div<{ margin?: string }>`
  cursor: pointer;
  transition: 0.2s linear;
  margin: ${({ margin }): string => margin || '0'};

  &:hover {
    transform: scale(1.1);
  }
`

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  iconSize?: number
  padding?: string
  errorMessage?: string
  isErrorShown?: boolean
  onIconClick?: () => void
  isAddressValid?: boolean
}

const InputWithIcon: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  iconSize,
  padding,
  errorMessage,
  isErrorShown,
  onIconClick,
  isAddressValid,
}) => (
  <Wrapper>
    <InputWrapper padding={padding} isError={isErrorShown}>
      <Input value={value} onChange={onChange} placeholder={placeholder} />
      {isAddressValid && (
        <IconWrapper margin='0 10px 0 0'>
          <Image
            onClick={onIconClick}
            width={iconSize || 18}
            height={iconSize || 18}
            src='/icons/checkmark-icon.svg'
            alt={placeholder}
          />
        </IconWrapper>
      )}
      <IconWrapper>
        <Image
          onClick={onIconClick}
          width={iconSize || 18}
          height={iconSize || 18}
          src='/icons/qr-icon.svg'
          alt={placeholder}
        />
      </IconWrapper>
    </InputWrapper>
    <InputErrorMessage isShown={isErrorShown} errorMessage={errorMessage} />
  </Wrapper>
)

export default InputWithIcon
