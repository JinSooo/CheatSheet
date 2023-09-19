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
    return (
      <div className='flex justify-center items-center'>
        <div className='font-bold pr-1 text-sm'>&</div>
        <div className='flex flex-col gap-1'>
          {arr.map((key, index) => (
            <div key={command + index.toString()}>
              {key.map((item, index) => (
                <div
                  key={command + (typeof item === 'string' ? item : item.key?.toString()) + index.toString()}
                  className='kbd kbd-sm'
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  } else if (type === 'multi') {
    return (
      <div className='flex justify-center items-center'>
        <div className='font-bold pr-1 text-sm'>|</div>
        <div className='flex flex-col gap-1'>
          {arr.map((key, index) => (
            <div key={command + index.toString()}>
              {key.map((item, index) => (
                <div
                  key={command + (typeof item === 'string' ? item : item.key?.toString()) + index.toString()}
                  className='kbd kbd-sm'
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  } else if (type === 'normal') {
    return arr[0].map((item, index) => (
      <div
        key={command + (typeof item === 'string' ? item : item.key?.toString()) + index.toString()}
        className='kbd kbd-sm'
      >
        {item}
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
        direction === 'start' ? 'justify-start' : 'justify-start'
      }`}
    >
      {commandEle}
    </div>
  )
}
