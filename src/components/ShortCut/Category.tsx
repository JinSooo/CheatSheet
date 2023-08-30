import { ShortCutCategory } from '@/lib/types'
import ShortCutItem from './ShortCutItem'

interface Props {
  category: ShortCutCategory
}

const Category = ({ category }: Props) => {
  return (
    <div>
      <div className='font-bold ml-[30%] p-2'>{category.name}</div>
      {category.shortcuts.map((shortcut) => (
        <ShortCutItem key={shortcut.command} shortcut={shortcut} />
      ))}
    </div>
  )
}

export default Category
