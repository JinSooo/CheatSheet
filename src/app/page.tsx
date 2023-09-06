'use client'

import ShortCut from '@/components/ShortCut/ShortCut'
import useTheme from '@/lib/hooks/useTheme'
import { listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'

export default function Home() {
  // 内部自处理主题
  const _ = useTheme()
  const [backgroundOpacity, setBackgroundOpacity] = useState(1) // 背景透明度
  const [windowBorderRadius, setWindowBorderRadius] = useState(16) // 窗口圆角
  const [mounted, setMounted] = useState(false)

  const initWindowListener = async () => {
    await listen('background_opacity', (event) => {
      setBackgroundOpacity(event.payload as number)
    })
    await listen('window_border_radius', (event) => {
      setWindowBorderRadius(event.payload as number)
    })
  }

  useEffect(() => {
    initWindowListener()
    setMounted(true)
  }, [])

  // 一定要等到mounted为true后再渲染，因为useTheme要获取Client端的主题样式，如果在服务端就执行了，会导致其为undefined
  if (!mounted) return null

  console.log(`backgroundOpacity${backgroundOpacity}`)

  return (
    <div
      className='h-screen w-screen text-[var(--foreground)] overflow-auto no-scrollbar'
      style={{
        background: `rgba(var(--background-rgba), ${backgroundOpacity})`,
        borderRadius: `${windowBorderRadius}px`,
      }}
    >
      <ShortCut />
    </div>
  )
}
