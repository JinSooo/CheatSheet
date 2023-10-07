'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import routes from './routes'
import { Menu } from 'lucide-react'
import WindowBar from '../common/WindowBar'

const Header = () => {
  const pathname = usePathname()

  return (
    <div
      className='navbar min-h-0 p-0 pb-3 pl-4 bg-[var(--background-fore)] flex justify-between items-center'
      data-tauri-drag-region
    >
      <div className='font-semibold select-none'>
        <Menu size={18} className='mr-1' />
        {routes.find((route) => route.path === pathname)?.name ?? ''}
      </div>
      <WindowBar />
    </div>
  )
}

export default Header
