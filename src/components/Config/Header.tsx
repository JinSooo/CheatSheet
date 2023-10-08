'use client'

import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import routes from './routes'
import { Menu } from 'lucide-react'
import { StoreContext } from '@/lib/store'
import { OSType } from '@/lib/types'
import WindowBar from '@/components/common/WindowBar'

const Header = () => {
  const pathname = usePathname()
  const { os } = useContext(StoreContext)

  return (
    <div className='navbar min-h-0 p-0 pb-3 pl-4 bg-[var(--background-fore)] flex justify-between items-center'>
      <div className='font-semibold select-none'>
        <Menu size={18} className='mr-1' />
        {routes.find((route) => route.path === pathname)?.name ?? ''}
      </div>
      {os === OSType.Windows ? <WindowBar /> : null}
    </div>
  )
}

export default Header
