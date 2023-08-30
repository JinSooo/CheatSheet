'use client'

import ShortCut from '@/components/ShortCut/ShortCut'
import { getOSType, readShortCut } from '@/lib/utils'
import { listen } from '@tauri-apps/api/event'
import { OsType } from '@tauri-apps/api/os'
import { useEffect, useState } from 'react'

export default function Home() {
  const [activeAppName, setActiveAppName] = useState('')
  const [os, setOS] = useState<OsType>('Windows_NT')

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

  const read = async () => {
    const shortcut = await readShortCut('shortcut.template')
    console.log(shortcut)
  }

  useEffect(() => {
    init()
  }, [])

  return <ShortCut appName={activeAppName} os={os} />
}
