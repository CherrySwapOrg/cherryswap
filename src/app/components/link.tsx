import styled from '@emotion/styled'

const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }): string => theme.colors.text.dark};
`

export default Link
