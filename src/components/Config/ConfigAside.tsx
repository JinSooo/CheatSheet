'use client'

import useTheme from '@/lib/hooks/useTheme'
import Link from 'next/link'
import routes from './routes'

const ConfigAside = () => {
  // 为了初始化主题配色
  const _ = useTheme()

  return (
    <ul className='menu w-44 rounded-box h-full gap-2'>
      {routes.map((route) => (
        <li key={route.path}>
          <Link href={route.path}>{route.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default ConfigAside
