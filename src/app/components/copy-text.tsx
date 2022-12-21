import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'

import styled from '@emotion/styled'
import Image from 'next/image'

const Wrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 20px;
  font-weight: 800;
  gap: 10px;
  word-break: break-word;
`
const Copied = styled.div`
  font-size: 12px;
  background-color: ${({ theme }): string => theme.colors.background.light};
  box-shadow: ${({ theme }): string => theme.boxShadow.primary};
  padding: 3px 5px;
  border-radius: 10px;
  color: ${({ theme }): string => theme.colors.primary};
`

interface Props {
  text: string
  iconSize?: number
}

const CopyText: React.FC<PropsWithChildren<Props>> = ({ text, children, iconSize }) => {
  const [isShowPopup, setIsShowPopup] = useState(false)

  const timer = useRef<null | ReturnType<typeof setTimeout>>(null)

  const onClose = useCallback(() => {
    if (isShowPopup) {
      setIsShowPopup(false)
    }
  }, [isShowPopup])

  useEffect(() => {
    if (isShowPopup) {
      timer.current = setTimeout(onClose, 1000)
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [isShowPopup, onClose])

  const handleCopyPress = (): void => {
    void navigator.clipboard.writeText(text)
    setIsShowPopup(true)
  }

  return (
    <Wrapper onClick={handleCopyPress}>
      {children}
      <Image width={iconSize || 18} height={iconSize || 18} src='/icons/copy-icon.svg' alt='Copy' />
      {isShowPopup && <Copied>Copied</Copied>}
    </Wrapper>
  )
}

export default CopyText
