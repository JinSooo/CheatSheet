import { ConfigCategory } from '@/lib/types'
import { Fragment } from 'react'

interface Props {
  title: string
  category: ConfigCategory[]
}

const Category = ({ title, category }: Props) => {
  return (
    <div className='w-full text-sm'>
      <p className='mb-2 pl-4 font-semibold'>{title}</p>
      <ul className='bg-[var(--background)] flex flex-col p-4 rounded-xl'>
        {category.map((item, i) => (
          <Fragment key={item.name}>
            <li>
              <div className='flex justify-between items-center'>
                <p>{item.name}</p>
                {item.component}
              </div>
              {i !== category.length - 1 && <div className='divider h-0 my-3' />}
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export default Category
