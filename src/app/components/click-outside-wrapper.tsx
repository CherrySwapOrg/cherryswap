import React, { PropsWithChildren, useEffect, useRef } from 'react'

import styled from '@emotion/styled'

const Wrapper = styled.div``

interface Props {
  setIsOpen?: (value: boolean) => void
}

const ClickOutsideWrapper: React.FC<PropsWithChildren<Props>> = ({ children, setIsOpen }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line
    const handleClick = (event: any): void => {
      if (setIsOpen && ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [setIsOpen, ref])

  return <Wrapper ref={ref}>{children}</Wrapper>
}

export default ClickOutsideWrapper
