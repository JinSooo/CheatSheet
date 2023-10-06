'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import routes from './routes'
import { Menu } from 'lucide-react'
import WindowBar from '../common/WindowBar'
import WindowBarButton from '../common/WindowBarButton'

const Header = () => {
  const pathname = usePathname()

  return (
    <WindowBar className='min-h-0 p-0 pb-3 pl-4 flex justify-between'>
      <div className='font-semibold select-none'>
        <Menu size={18} className='mr-1' />
        {routes.find((route) => route.path === pathname)?.name ?? ''}
      </div>
      <WindowBarButton />
    </WindowBar>
  )
}

export default Header
