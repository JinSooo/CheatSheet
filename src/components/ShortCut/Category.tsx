import { OSType, ShortCutCategory } from '@/lib/types'
import ShortCutItem from './ShortCutItem'

interface Props {
  category: ShortCutCategory
  os: OSType
}

const Category = ({ category, os }: Props) => {
  return (
    // 四等分
    <div className='w-[25%] box-border px-4 pb-4'>
      <div className='font-bold ml-[30%] p-2'>{category.name}</div>
      {category.shortcuts.map((shortcut) => (
        <ShortCutItem key={shortcut.description} shortcut={shortcut} os={os} />
      ))}
    </div>
  )
}

export default Category
