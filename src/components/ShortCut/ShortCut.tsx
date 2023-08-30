import { OSType, ShortCut as ShortCutType } from '@/lib/types'
import { readShortCut } from '@/lib/utils'
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
    <>
      {/* 四等分 */}
      <div className='grid grid-cols-4 gap-4 box-border py-6 px-10'>
        {shortcut ? (
          shortcut.categories.map((category) => <Category key={category.name} category={category} os={os} />)
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default ShortCut
