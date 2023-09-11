import { StoreContext } from '@/lib/store'
import { convertShortCutCommand } from '@/lib/utils'
import { useContext } from 'react'

interface Props {
  command: string
  gap?: number
}

export const ShortCutCommand = ({ command, gap = 0 }: Props) => {
  const { os } = useContext(StoreContext)

  return (
    <div className={`flex ${gap > 0 ? `gap-${gap}` : ''}`}>
      {convertShortCutCommand(os, command).map((key) => (
        <div key={key} className='kbd kbd-sm'>
          {key}
        </div>
      ))}
    </div>
  )
}
