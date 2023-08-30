import { ShortCutItem as ShortCutItemType } from '@/lib/types'

interface Props {
  shortcut: ShortCutItemType
}

const ShortCutItem = ({ shortcut }: Props) => {
  return (
    <div className='flex gap-3 overflow-hidden'>
      <p className='w-[30%] text-right text-overflow-hidden'>{shortcut.command}</p>
      <p className='w-[70%] text-overflow-hidden' title={shortcut.description}>
        {shortcut.description}
      </p>
    </div>
  )
}

export default ShortCutItem
