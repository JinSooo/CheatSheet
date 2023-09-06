import { OSType, ShortCutCategory } from '@/lib/types'
import ShortCutItem from './ShortCutItem'

interface Props {
  category: ShortCutCategory
}

const Category = ({ category }: Props) => {
  return (
    // 四等分
    <div className='w-[25%] box-border px-6 pb-6'>
      <div className='font-bold ml-[35%] pl-4 pb-3'>{category.name}</div>
      {category.shortcuts.map((shortcut) => (
        <ShortCutItem key={shortcut.description} shortcut={shortcut} />
      ))}
    </div>
  )
}

export default Category
