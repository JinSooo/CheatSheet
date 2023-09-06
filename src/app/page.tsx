'use client'

import ShortCut from '@/components/ShortCut/ShortCut'
import useTheme from '@/lib/hooks/useTheme'
import { useEffect, useState } from 'react'

export default function Home() {
  // 内部自处理主题
  const _ = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 一定要等到mounted为true后再渲染，因为useTheme要获取Client端的主题样式，如果在服务端就执行了，会导致其为undefined
  if (!mounted) return null

  return (
    <div className='h-screen w-screen rounded-2xl text-[var(--foreground)] bg-[var(--background)] overflow-auto no-scrollbar'>
      <ShortCut />
    </div>
  )
}
