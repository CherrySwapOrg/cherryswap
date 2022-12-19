import React, { PropsWithChildren } from 'react'

import styled from '@emotion/styled'

const CheckboxWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;

  input {
    border: none;
    visibility: hidden;
    height: 20px;
    width: 20px;
    position: relative;
  }

  input::before {
    border: 1px solid ${({ theme }): string => theme.colors.border.main};
    border-radius: ${({ theme }): string => theme.borderRadius.extraSmall};
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    visibility: visible;
  }

  input:checked::before {
    background-color: ${({ theme }): string => theme.colors.primary};
    background-image: url('/icons/checkmark-icon-white.svg');
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
`

interface Props {
  id: string
  checked: boolean
  onChange: () => void
}

const Checkbox: React.FC<PropsWithChildren<Props>> = ({ children, id, checked, onChange }) => (
  <CheckboxWrapper>
    <input type='checkbox' id={id} name={id} checked={checked} onChange={onChange} />
    <label htmlFor={id}>{children}</label>
  </CheckboxWrapper>
)

export default Checkbox
