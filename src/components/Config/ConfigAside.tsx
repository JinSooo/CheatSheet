'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import routes from './routes'

const ConfigAside = () => {
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
            {route.icon}
            <p>{route.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ConfigAside