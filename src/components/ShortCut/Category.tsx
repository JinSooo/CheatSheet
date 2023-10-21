'use client'

import { ShortCutCategory } from '@/lib/types'
import ShortCutItem from './ShortCutItem'
import { Fragment, useContext } from 'react'
import { StoreContext } from '@/lib/store'

interface Props {
  category: ShortCutCategory
}

const Category = ({ category }: Props) => {
  const { os } = useContext(StoreContext)

  return (
    <div className='box-border px-6 pb-6 w-[100%] sm:w-[50%] lg:w-[33%] xl:w-[25%]'>
      <div className='font-bold ml-[40%] pl-3 pb-3'>{category.name}</div>
      {category.shortcuts.map((shortcut) => (
        <Fragment key={category.name + shortcut.description}>
          {shortcut.command[os] && <ShortCutItem command={shortcut.command[os]} description={shortcut.description} />}
        </Fragment>
      ))}
    </div>
  )
}

export default Category
