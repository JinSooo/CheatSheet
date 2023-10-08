'use client'

import ConfigAside from '@/components/Config/ConfigAside'
import Header from '@/components/Config/Header'
import useTheme from '@/lib/hooks/useTheme'
import { useContext } from 'react'
import { StoreContext } from '@/lib/store'
import { DragRegion } from '@/components/common/DragRegion'
import { OSType } from '@/lib/types'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // 内部自处理主题
  const _ = useTheme()
  const { os } = useContext(StoreContext)

  return (
    <div className='w-full h-full text-[var(--foreground)] bg-[var(--background-fore)] overflow-hidden rounded-sm'>
      <DragRegion />
      <div className={os === OSType.Mac ? 'h-screen w-screen flex p-4 pt-6 pl-2' : 'h-screen w-screen flex p-4 pl-2'}>
        <ConfigAside />
        <div className='flex-1 flex flex-col'>
          <Header />
          <div className='flex-1 bg-[var(--background)] rounded-box ml-1 overflow-y-auto'>{children}</div>
        </div>
      </div>
    </div>
  )
}
