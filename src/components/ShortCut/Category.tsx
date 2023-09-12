import { ShortCutCategory } from '@/lib/types'
import ShortCutItem from './ShortCutItem'

interface Props {
  category: ShortCutCategory
}

const Category = ({ category }: Props) => {
  return (
    // 四等分
    <div className='box-border px-6 pb-6 w-[100%] sm:w-[50%] lg:w-[33%] xl:w-[25%]'>
      <div className='font-bold ml-[35%] pl-4 pb-3'>{category.name}</div>
      {category.shortcuts.map((shortcut) => (
        <ShortCutItem key={shortcut.description} shortcut={shortcut} />
      ))}
    </div>
  )
}

export default Category
