'use client'

import { StoreContext } from '@/lib/store'
import { ShortCut as ShortCutType } from '@/lib/types'
import { MasonryGrid } from '@egjs/react-grid'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Category from './Category'
import { readAppShortCut, readOSShortCut } from '@/lib/utils'
import { showMainWindow } from '@/lib/utils/window'
import { listen } from '@tauri-apps/api/event'

const ShortCut = () => {
  const { os } = useContext(StoreContext)
  const osShortCut = useRef<ShortCutType>() // 缓存osShortCut，避免多次读取
  const [activeAppName, setActiveAppName] = useState('') // 聚焦应用
  const [shortcut, setShortCut] = useState<ShortCutType>()

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

  const initOSShortCut = async () => {
    const file = await readOSShortCut(os)
    osShortCut.current = file
    setShortCut(osShortCut.current)
    // init activeAppName
    setActiveAppName(file.name)
  }

  // 根据appName更新快捷键信息
  const getAppShortCut = async (name: string) => {
    const file = await readAppShortCut(name)
    if (file?.name) setShortCut(file)
    else setShortCut(osShortCut.current)
  }

  useEffect(() => {
    getAppShortCut(activeAppName)
  }, [activeAppName])

  // 对于不同的应用，界面更新完成后，再显示窗口
  useLayoutEffect(() => {
    setTimeout(showMainWindow, 50)
  }, [shortcut])

  useEffect(() => {
    initListen()
    initOSShortCut()
  }, [])

  return (
    <div className='w-full h-full box-border p-6 select-none'>
      {/* 瀑布流布局 */}
      <MasonryGrid>
        {shortcut?.categories.map((category) => (
          <Category key={category.name} category={category} />
        ))}
      </MasonryGrid>
    </div>
  )
}

export default ShortCut
