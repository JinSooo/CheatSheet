import { ShortCutCommand } from '../common/ShortCutCommand'

interface Props {
  command: string
  description: string
}

const ShortCutItem = ({ command, description }: Props) => {
  return (
    <div className='flex gap-4 mb-3 overflow-hidden items-center'>
      <div className='w-[40%] text-right flex justify-end gap-1'>
        <ShortCutCommand command={command} />
      </div>
      <p className='w-[60%] text-overflow-hidden'>{description}</p>
      {/* 顶部提示tooltip */}
      <div className='absolute left-[40%] tooltip w-[50%] h-[24px] z-10' data-tip={description} />
    </div>
  )
}

export default ShortCutItem
