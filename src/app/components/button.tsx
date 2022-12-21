import styled from '@emotion/styled'

const Button = styled.button`
  background-color: ${({ theme }): string => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }): string => theme.borderRadius.normal};
  color: ${({ theme }): string => theme.colors.text.main};
  cursor: pointer;
  outline: none;
  transition: 0.2s linear;

  :hover {
    background-color: ${({ theme }): string => theme.colors.button.background.hover};
  }

  :active {
    background-color: ${({ theme }): string => theme.colors.button.background.press};
    transition: none;
  }

  :disabled {
    background-color: ${({ theme }): string => theme.colors.button.background.disabled};
  }
`

export default Button
