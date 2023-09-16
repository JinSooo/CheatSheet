'use client'

import { StoreContext } from '@/lib/store'
import { ShortCut as ShortCutType } from '@/lib/types'
import { MasonryGrid } from '@egjs/react-grid'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Category from './Category'
import { readAppShortCut, readOSShortCut } from '@/lib/utils'
import { showMainWindow } from '@/lib/utils/window'

const ShortCut = () => {
  const { os, appName } = useContext(StoreContext)
  // 缓存osShortCut，避免多次读取
  const osShortCut = useRef<ShortCutType>()
  const [shortcut, setShortCut] = useState<ShortCutType>()

  const initOSShortCut = async () => {
    const file = await readOSShortCut(os)
    osShortCut.current = file
    setShortCut(osShortCut.current)
  }

  const getAppShortCut = async (name: string) => {
    const file = await readAppShortCut(name)
    if (file?.name) setShortCut(file)
    else setShortCut(osShortCut.current)
  }

  useEffect(() => {
    getAppShortCut(appName)
  }, [appName])

  // 对于不同的应用，界面更新完成后，再显示窗口
  useLayoutEffect(() => {
    setTimeout(showMainWindow, 50)
  }, [shortcut])

  useEffect(() => {
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
