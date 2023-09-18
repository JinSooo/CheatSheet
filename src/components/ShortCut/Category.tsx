'use client'

import { ShortCutCategory } from '@/lib/types'
import ShortCutItem from './ShortCutItem'
import { useContext } from 'react'
import { StoreContext } from '@/lib/store'

interface Props {
  category: ShortCutCategory
}

const Category = ({ category }: Props) => {
  const { os } = useContext(StoreContext)

  return (
    // 四等分
    <div className='box-border px-6 pb-6 w-[100%] sm:w-[50%] lg:w-[33%] xl:w-[25%]'>
      <div className='font-bold ml-[40%] pl-3 pb-3'>{category.name}</div>
      {category.shortcuts.map((shortcut) => (
        // 系统存在对应快捷键才显示
        <>{shortcut.command[os] && <ShortCutItem key={shortcut.description} shortcut={shortcut} />}</>
      ))}
    </div>
  )
}

export default Category
