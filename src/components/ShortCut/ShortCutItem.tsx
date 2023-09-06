import { StoreContext } from '@/lib/store'
import { OSType, ShortCutItem as ShortCutItemType } from '@/lib/types'
import { convertShortCutCommand } from '@/lib/utils'
import { useContext } from 'react'

interface Props {
  shortcut: ShortCutItemType
}

const ShortCutItem = ({ shortcut }: Props) => {
  const { os } = useContext(StoreContext)

  return (
    <div className='flex gap-4 mb-3 overflow-hidden'>
      <div className='w-[35%] text-right flex justify-end gap-1'>
        {convertShortCutCommand(os, shortcut.command).map((key) => (
          <div key={key} className='kbd kbd-sm'>
            {key}
          </div>
        ))}
      </div>
      <p className='w-[65%] text-overflow-hidden'>{shortcut.description}</p>
      {/* 顶部提示tooltip */}
      {/* rome-ignore lint/style/useSelfClosingElements: <explanation> */}
      <div className='absolute left-[40%] tooltip w-[50%] h-[24px] z-10' data-tip={shortcut.description}></div>
    </div>
  )
}

export default ShortCutItem
