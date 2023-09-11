'use client'

import { ThemeProvider } from '@/components/common/ThemeProvider'
import { StoreProvider } from '@/lib/store'
import '@/lib/styles/globals.css'
import { OSType } from '@/lib/types'
import { getOSType } from '@/lib/utils'
import { listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'
import {Store} from "tauri-plugin-store-api";
import {initConfigStore} from "@/lib/utils/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeAppName, setActiveAppName] = useState('')
  const [os, setOS] = useState<OSType>(OSType.Windows)
  // 全局配置文件Store
  const [configStore, setConfigStore] = useState<Store>(new Store(''))

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

  const initConfig = async () => {
    setConfigStore(await initConfigStore())
  }

  useEffect(() => {
    initListen()
    initOS()
    initConfigStore()
    initConfig()
  }, [])

  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute='data-theme' defaultTheme='system' enableSystem>
          <StoreProvider value={{ os, configStore, appName: activeAppName }}>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
