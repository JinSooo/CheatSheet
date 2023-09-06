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
  }, [])

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
