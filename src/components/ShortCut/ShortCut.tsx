'use client'

import { StoreContext } from '@/lib/store'
import { ShortCut as ShortCutType } from '@/lib/types'
import { MasonryGrid } from '@egjs/react-grid'
import { useContext, useEffect, useRef, useState } from 'react'
import Category from './Category'
import { readAppShortCut, readOSShortCut } from '@/lib/utils'

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

  const show = async () => {
    const { WebviewWindow } = await import('@tauri-apps/api/window')
    WebviewWindow.getByLabel('main')?.show()
  }

  const getAppShortCut = async (name: string) => {
    const file = await readAppShortCut(name)
    // @ts-ignore
    setShortCut(file ?? osShortCut.current)
  }

  useEffect(() => {
    getAppShortCut(appName)
  }, [appName])

  // 界面更新完成后，再显示窗口
  useEffect(() => {
    show()
  }, [shortcut])

  useEffect(() => {
    initOSShortCut()
  }, [])

  return (
    <div className='w-full h-full box-border p-6 select-none'>
      {/* 瀑布流布局 */}
      <MasonryGrid>
        {shortcut ? shortcut.categories.map((category) => <Category key={category.name} category={category} />) : <></>}
      </MasonryGrid>
    </div>
  )
}

export default ShortCut
