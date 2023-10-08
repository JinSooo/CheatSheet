'use client'

import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import routes from './routes'
import { Menu } from 'lucide-react'
import WindowBar from '../common/WindowBar'
import WindowBarButton from '../common/WindowBarButton'
import { StoreContext } from '@/lib/store'
import { OSType } from '@/lib/types'

const Header = () => {
  const pathname = usePathname()
  const { os } = useContext(StoreContext)

  return (
    <WindowBar className='min-h-0 p-0 pb-3 pl-4 flex justify-between'>
      <div className='font-semibold select-none flex items-center'>
        <Menu size={18} className='mr-1' />
        {routes.find((route) => route.path === pathname)?.name ?? ''}
      </div>
      {os === OSType.Windows ? <WindowBarButton /> : null}
    </WindowBar>
  )
}

export default Header
