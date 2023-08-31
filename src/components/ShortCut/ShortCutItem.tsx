import { OSType, ShortCutItem as ShortCutItemType } from '@/lib/types'
import { convertShortCutCommand } from '@/lib/utils'

interface Props {
  shortcut: ShortCutItemType
  os: OSType
}

const ShortCutItem = ({ shortcut, os }: Props) => {
  return (
    <div className='flex gap-3 mb-3 overflow-hidden'>
      <div className='w-[35%] text-right flex justify-end gap-1'>
        {convertShortCutCommand(os, shortcut.command).map((key) => (
          <div key={key} className='kbd kbd-sm'>
            {key}
          </div>
        ))}
      </div>
      <p className='w-[65%] text-overflow-hidden' title={shortcut.description}>
        {shortcut.description}
      </p>
    </div>
  )
}

export default ShortCutItem
