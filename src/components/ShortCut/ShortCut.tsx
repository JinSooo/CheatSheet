'use client'

import { StoreContext } from '@/lib/store'
import { ShortCut as ShortCutType } from '@/lib/types'
import { readShortCut } from '@/lib/utils'
import { MasonryGrid } from '@egjs/react-grid'
import { useContext, useEffect, useState } from 'react'
import Category from './Category'

const ShortCut = () => {
  const store = useContext(StoreContext)
  const [shortcut, setShortCut] = useState<ShortCutType>()

  const getShortCut = async (name: string) => {
    // const file = await readShortCut(name)
    const file = await readShortCut('test')
    if (!shortcut || file.name !== shortcut.name) {
      setShortCut(file)
    }
  }

  useEffect(() => {
    getShortCut(store.os)
  }, [store.os])

  return (
    <div className='w-full h-full box-border p-6'>
      {/* 瀑布流布局 */}
      <MasonryGrid column={4}>
        {shortcut ? shortcut.categories.map((category) => <Category key={category.name} category={category} />) : <></>}
      </MasonryGrid>
    </div>
  )
}

export default ShortCut
