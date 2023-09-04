'use client'

import useTheme from '@/lib/hooks/useTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import routes from './routes'

const ConfigAside = () => {
  // 为了初始化主题配色
  const _ = useTheme()
  const pathname = usePathname()
  console.log(pathname)

  return (
    <ul className='menu w-44 h-full gap-2 pt-4'>
      {routes.map((route) => (
        <li key={route.path}>
          <Link
            className={pathname === route.path ? 'active bg-[var(--background)]!' : ''}
            href={route.path}
            // TODO: 目前Light模式下色彩不匹配
            // style={{ backgroundColor: pathname === route.path ? 'var(--background)' : '' }}
          >
            {route.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ConfigAside
