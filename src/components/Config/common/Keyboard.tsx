import { ShortCutCommand } from '@/components/common/ShortCutCommand'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  submit?: () => void
  tooltip?: string
  command?: string
}

const Keyboard = ({ submit, tooltip, command, ...props }: Props) => {
  return (
    <div className={`relative w-1/3 text-left ${tooltip ? 'tooltip tooltip-left' : ''}`} data-tip={tooltip}>
      <input type='text' className='input input-sm input-bordered input-info w-full max-w-xs' {...props} />
      <div className='w-full absolute top-[50%] translate-y-[-50%] left-2 pointer-events-none'>
        <ShortCutCommand command={command ?? ''} gap={1} />
      </div>
      {/* TODO: 按钮点击向下偏移，没找到问题所在，可以当作一种特色（⊙ｏ⊙） */}
      <button
        className='btn w-8 h-8 min-h-8 btn-ghost absolute top-[50%] translate-y-[-50%] right-0'
        type='button'
        onClick={submit}
      >
        √
      </button>
    </div>
  )
}

export default Keyboard
