'use client'

import ShortCut from '@/components/ShortCut/ShortCut'
import { OSType } from '@/lib/types'
import { getOSType, readShortCut } from '@/lib/utils'
import { listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'

export default function Home() {
  const [activeAppName, setActiveAppName] = useState('')
  const [os, setOS] = useState<OSType>(OSType.Windows)

  const init = async () => {
    // 初始化监听事件
    await listen('active-window', (event) => {
      console.log('🎉🎉🎉', 'active-window', event.payload)
      setActiveAppName(event.payload as string)
    })
    // 获取操作系统
    const os = await getOSType()
    console.log('🎉🎉🎉', 'os', os)
    setOS(os)
  }

  useEffect(() => {
    init()
  }, [])

  return <ShortCut appName={activeAppName} os={os} />
}
