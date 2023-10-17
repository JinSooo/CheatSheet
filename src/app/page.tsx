'use client'
import ShortCut from '@/components/ShortCut/ShortCut'
import useTheme from '@/lib/hooks/useTheme'
import { StoreContext } from '@/lib/store'
import { listen } from '@tauri-apps/api/event'
import { useContext, useEffect, useState } from 'react'
import { Store } from 'tauri-plugin-store-api'

export default function Home() {
  // 内部自处理主题
  const _ = useTheme()
  const { configStore } = useContext(StoreContext)
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

  const initWindowStyle = async (configStore: Store) => {
    setBackgroundOpacity(((await configStore.get('windowOpacity')) as number) / 10 ?? 1)
    setWindowBorderRadius((await configStore.get('windowBorderRadius')) ?? 16)
  }

  useEffect(() => {
    if (configStore) initWindowStyle(configStore)
  }, [configStore])

  useEffect(() => {
    initWindowListener()
  }, [])

  return (
    <div
      className='h-screen w-screen text-[var(--foreground)] overflow-auto no-scrollbar'
      style={{
        background: `rgba(var(--background-fore-rgba), ${backgroundOpacity})`,
        borderRadius: `${windowBorderRadius}px`,
      }}
    >
      <ShortCut />
    </div>
  )
}
