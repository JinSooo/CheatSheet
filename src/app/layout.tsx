'use client'

import { ThemeProvider } from '@/components/common/ThemeProvider'
import { StoreProvider } from '@/lib/store'
import '@/lib/styles/globals.css'
import { OSType } from '@/lib/types'
import { getOSType } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Store } from 'tauri-plugin-store-api'
import { initConfigStore } from '@/lib/utils/store'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [os, setOS] = useState<OSType>(OSType.Windows)
  // 全局配置文件Store
  const [configStore, setConfigStore] = useState<Store>(new Store(''))

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
    initOS()
    initConfig()
  }, [])

  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute='data-theme' defaultTheme='system' enableSystem>
          <StoreProvider value={{ os, configStore }}>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
