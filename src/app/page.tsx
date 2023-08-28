'use client'

import { listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'

export default function Home() {
  const [activeAppName, setActiveAppName] = useState('')

  const initListen = async () => {
    await listen('active-window', (event) => {
      console.log('payload', event.payload)
      setActiveAppName(event.payload as string)
    })

    // 异步引入，确保处于浏览器环境
    const { invoke } = await import('@tauri-apps/api')
    // 先通知后端已经监听，再去初始化全局热键（避免监听被堵塞）
    invoke('init_listen')
  }

  useEffect(() => {
    initListen()
  }, [])

  return (
    <div>
      CheatSheet
      <h1 className='text-2xl'>{activeAppName}</h1>
    </div>
  )
}
