import { OSType, ShortCutItem as ShortCutItemType } from '@/lib/types'
import { convertShortCutCommand } from '@/lib/utils'

interface Props {
  shortcut: ShortCutItemType
  os: OSType
}

const ShortCutItem = ({ shortcut, os }: Props) => {
  return (
    <div className='flex gap-3 mb-2 overflow-hidden'>
      <div className='w-[30%] text-right flex justify-end gap-1'>
        {convertShortCutCommand(os, shortcut.command).map((key) => (
          <div key={key} className='kbd kbd-sm'>
            {key}
          </div>
        ))}
      </div>
      <p className='w-[70%] text-overflow-hidden' title={shortcut.description}>
        {shortcut.description}
      </p>
    </div>
  )
}

export default ShortCutItem
