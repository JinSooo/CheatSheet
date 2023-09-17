import { StoreContext } from '@/lib/store'
import { ShortCutKind } from '@/lib/types'
import { convertShortCutCommand } from '@/lib/utils'
import { useContext, useMemo } from 'react'

interface Props {
  command: string
  gap?: number
  direction?: 'start' | 'end'
}

// 根据不同类型的快捷键生成对应的快捷键
const generateCommand = (type: ShortCutKind['type'], arr: ShortCutKind['arr'], command: string) => {
  if (type === 'combination') {
    return arr.map((key, i) => (
      <>
        {key.map((item) => (
          <div key={command + item.toString()} className='kbd kbd-sm'>
            {item}
          </div>
        ))}
        {i !== arr.length - 1 && <div className='px-2'>&</div>}
      </>
    ))
  } else if (type === 'multi') {
    return arr.map((key, i) => (
      <>
        {key.map((item) => (
          <div key={command + item.toString()} className='kbd kbd-sm'>
            {item}
          </div>
        ))}
        {i !== arr.length - 1 && <div className='px-2'>|</div>}
      </>
    ))
  } else if (type === 'normal') {
    return arr[0].map((key) => (
      <div key={command + key.toString()} className='kbd kbd-sm'>
        {key}
      </div>
    ))
  }
}

export const ShortCutCommand = ({ command, gap = 0, direction = 'end' }: Props) => {
  const { os } = useContext(StoreContext)
  const commandEle = useMemo(() => {
    const { type, arr } = convertShortCutCommand(os, command)
    return generateCommand(type, arr, command)
  }, [os, command])

  return (
    <div
      className={`flex flex-wrap ${gap > 0 ? `gap-${gap}` : ''} ${
        direction === 'start' ? 'justify-start' : 'justify-end'
      }`}
    >
      {commandEle}
    </div>
  )
}
