'use client'

import { ThemeProvider } from '@/components/common/ThemeProvider'
import { StoreProvider } from '@/lib/store'
import '@/lib/styles/globals.css'
import { OSType } from '@/lib/types'
import { getOSType } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Store } from 'tauri-plugin-store-api'
import { initConfigStore } from '@/lib/utils/store'
import { Toaster } from 'react-hot-toast'
import { listen } from '@tauri-apps/api/event'

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
    console.log('🎉🎉🎉', 'os', osType)
    setOS(osType)
  }

  const initConfig = async () => {
    setConfigStore(await initConfigStore())
  }

  const initListener = async () => {
    await listen('font_family', (event) => {
      appendFontFamilyHTMLElement(event.payload as string)
    })
  }

  const initFontFamily = async () => {
    configStore.get('fontFamily').then((fontFamily) => {
      if (!fontFamily) return

      appendFontFamilyHTMLElement(fontFamily as string)
    })
  }

  const appendFontFamilyHTMLElement = (fontFamily: string) => {
    let style = document.createElement('style')
    style.innerHTML = `* { font-family: ${fontFamily} !important; }`
    document.head.appendChild(style)
  }

  useEffect(() => {
    initOS()
    initConfig()
    initListener()
  }, [])

  useEffect(() => {
    initFontFamily()
  }, [configStore])

  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute='data-theme' defaultTheme='system' enableSystem>
          <StoreProvider value={{ os, configStore }}>{children}</StoreProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
