'use client'

import { ThemeProvider } from '@/components/common/ThemeProvider'
import { StoreProvider } from '@/lib/store'
import '@/lib/styles/globals.css'
import { OSType } from '@/lib/types'
import { getOSType } from '@/lib/utils'
import { initConfigStore, store } from '@/lib/utils/store'
import { listen } from '@tauri-apps/api/event'
import type { Metadata } from 'next'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeAppName, setActiveAppName] = useState('')
  const [os, setOS] = useState<OSType>(OSType.Windows)

  // 初始化监听事件
  const initListen = async () => {
    // 监听当前应用
    await listen('active-window', (event) => {
      console.log('🎉🎉🎉', 'active-window', event.payload)
      setActiveAppName(event.payload as string)
    })
  }

  // 获取操作系统
  const initOS = async () => {
    const osType = await getOSType()
    console.log('🎉🎉🎉', 'os', os)
    setOS(osType)
  }

  useEffect(() => {
    initListen()
    initOS()
    initConfigStore()
  }, [])

  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute='data-theme' defaultTheme='system' enableSystem>
          <StoreProvider value={{ os, appName: activeAppName }}>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
