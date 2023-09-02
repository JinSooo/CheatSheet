import { OSType, ShortCut as ShortCutType } from '@/lib/types'
import { readShortCut } from '@/lib/utils'
import { MasonryGrid } from '@egjs/react-grid'
import { useEffect, useState } from 'react'
import Category from './Category'

interface Props {
  appName: string // App Name
  os: OSType // OS Name
}

const ShortCut = ({ appName, os }: Props) => {
  const [shortcut, setShortCut] = useState<ShortCutType>()

  const getShortCut = async (name: string) => {
    // const file = await readShortCut(name)
    const file = await readShortCut('test')
    if (!shortcut || file.name !== shortcut.name) {
      setShortCut(file)
    }
  }

  useEffect(() => {
    getShortCut(os)
  }, [os])

  return (
    <div className='w-full h-full box-border p-6'>
      {/* 瀑布流布局 */}
      <MasonryGrid column={4}>
        {shortcut ? (
          shortcut.categories.map((category) => <Category key={category.name} category={category} os={os} />)
        ) : (
          <></>
        )}
      </MasonryGrid>
    </div>
  )
}

export default ShortCut