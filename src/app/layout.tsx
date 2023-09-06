'use client'

import { ThemeProvider } from '@/components/common/ThemeProvider'
import { StoreProvider } from '@/lib/store'
import '@/lib/styles/globals.css'
import { OSType } from '@/lib/types'
import { getOSType } from '@/lib/utils'
import { listen } from '@tauri-apps/api/event'
import type { Metadata } from 'next'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const metadata: Metadata = {
  title: 'CheatSheet',
  description: 'CheatSheet',
  icons: {
    shortcut: ['#'],
  },
}

const availableThemes = ['dark', 'light', 'system']

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nextTheme = useTheme()
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
      nextTheme.setTheme(theme)
    })
  }

  // 获取操作系统
  const initOS = async () => {
    const osType = await getOSType()
    console.log('🎉🎉🎉', 'os', os)
    setOS(osType)
  }

  const init = async () => {
    await initListen()
    await initOS()
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute='data-theme' defaultTheme='system' enableSystem themes={availableThemes}>
          <StoreProvider value={{ os, appName: activeAppName }}>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
