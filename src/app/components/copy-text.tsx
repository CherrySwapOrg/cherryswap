import React, { PropsWithChildren } from 'react'

import Image from 'next/image'

interface Props {
  iconSize?: number
}

const CopyText: React.FC<PropsWithChildren<Props>> = ({ children, iconSize }) => (
  <>
    {children}
    <Image width={iconSize || 18} height={iconSize || 18} src='/icons/copy-icon.svg' alt='Copy' />
  </>
)

export default CopyText
