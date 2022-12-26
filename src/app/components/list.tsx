import styled from '@emotion/styled'

const UlList = styled.ul`
  li {
    margin-bottom: 12px;
    font-size: 12px;
    padding-left: 12px;
    position: relative;
  }

  li:before {
    content: '';
    position: absolute;
    top: 7px;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 1px solid ${({ theme }): string => theme.colors.border.primaryOnDark};
    background-color: red;
  }
`

export default UlList
