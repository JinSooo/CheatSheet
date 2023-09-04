'use client'

import ShortCut from '@/components/ShortCut/ShortCut'
import useTheme from '@/lib/hooks/useTheme'
import { OSType } from '@/lib/types'
import { getOSType } from '@/lib/utils'
import { listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'

export default function Home() {
  const { setTheme } = useTheme()
  const [activeAppName, setActiveAppName] = useState('')
  const [os, setOS] = useState<OSType>(OSType.Windows)

  // 初始化监听事件
  const initListen = async () => {
    // 监听当前应用
    await listen('active-window', (event) => {
      console.log('🎉🎉🎉', 'active-window', event.payload)
      setActiveAppName(event.payload as string)
    })
    // 监听主题变化
    await listen('theme', (event) => {
      const theme = (event.payload as string).split('_')[1]
      console.log('🎉🎉🎉', 'theme', theme)
      setTheme(theme)
    })
  }

  const init = async () => {
    await initListen()
    // 获取操作系统
    const os = await getOSType()
    console.log('🎉🎉🎉', 'os', os)
    setOS(os)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className='h-screen w-screen rounded-2xl text-[var(--foreground)] bg-[var(--background)] overflow-auto no-scrollbar'>
      <ShortCut appName={activeAppName} os={os} />
    </div>
  )
}
