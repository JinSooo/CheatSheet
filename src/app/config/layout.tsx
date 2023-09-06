'use client'

import ConfigAside from '@/components/Config/ConfigAside'
import useTheme from '@/lib/hooks/useTheme'
import { useEffect, useState } from 'react'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // 内部自处理主题
  const _ = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    // 一定要等到mounted为true后再渲染，因为useTheme要获取Client端的主题样式，如果在服务端就执行了，会导致其为undefined
    return null

  return (
    <div className='h-screen w-screen text-[var(--foreground)] bg-[var(--background-config-menu)] overflow-hidden flex'>
      <ConfigAside />
      <div className='flex-1 bg-[var(--background)] rounded-box my-4 mr-4 overflow-scroll no-scrollbar'>{children}</div>
    </div>
  )
}
