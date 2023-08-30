import { OSType, ShortCut as ShortCutType } from '@/lib/types'
import { readShortCut } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface Props {
  appName: string // App Name
  os: OSType // OS Name
}

const ShortCut = ({ appName, os }: Props) => {
  const [shortcut, setShortCut] = useState<ShortCutType>()

  const getShortCut = async (name: string) => {
    const file = await readShortCut(name)
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
      <div className='grid grid-cols-3 gap-2'>
        {shortcut ? (
          shortcut.categories.map((category) => (
            <div key={category.name}>
              <div className='font-bold text-2xl'>{category.name}</div>
              {category.shortcuts.map((shortcut) => (
                <div key={shortcut.command} className='flex gap-2'>
                  <div className='w-40 text-right'>{shortcut.command}</div>
                  <div>{shortcut.description}</div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default ShortCut
