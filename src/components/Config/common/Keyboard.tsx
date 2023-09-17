import { ShortCutCommand } from '@/components/common/ShortCutCommand'
import { Check } from 'lucide-react'
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
        <ShortCutCommand command={command ?? ''} gap={1} direction='start' />
      </div>
      <button className='btn btn-ghost absolute top-0 right-0 px-0 min-h-0 h-8 w-8' type='button' onClick={submit}>
        <Check size={20} />
      </button>
    </div>
  )
}

export default Keyboard
