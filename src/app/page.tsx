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
    await listen('window_opacity', (event) => {
      setBackgroundOpacity(event.payload as number)
    })
    await listen('window_border_radius', (event) => {
      setWindowBorderRadius(event.payload as number)
    })
  }

  // FIX(Mac): CheatSheet窗口无法居中显示
  const adjustCenterMainWindow = async () => {
    const { invoke } = await import('@tauri-apps/api')
    // 调用两次调整窗口位置，防止窗口位置不正确
    await invoke('adjust_center_main_window')
    await invoke('adjust_center_main_window')
  }

  useEffect(() => {
    initWindowListener()
    adjustCenterMainWindow()
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
