'use client'

import { ThemeProvider } from '@/components/common/ThemeProvider'
import { StoreProvider } from '@/lib/store'
import '@/lib/styles/globals.css'
import { OSType } from '@/lib/types'
import { getOSType } from '@/lib/utils'
import { listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'
import { Store } from 'tauri-plugin-store-api'
import { initConfigStore } from '@/lib/utils/store'
import { showMainWindow } from '@/lib/utils/window'

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
      setActiveAppName((activeAppName) => {
        console.log('🎉🎉🎉', 'active-window', event.payload, activeAppName)
        // 对于相同的应用，直接显示
        if (event.payload === activeAppName) showMainWindow()
        return event.payload as string
      })
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

  const adjustCenterMainWindow = async () => {
    const { invoke } = await import('@tauri-apps/api')
    // 调用两次调整窗口位置，防止窗口位置不正确
    await invoke('adjust_center_main_window')
    await invoke('adjust_center_main_window')
  }

  useEffect(() => {
    initListen()
    initOS()
    initConfig()
    adjustCenterMainWindow()
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
