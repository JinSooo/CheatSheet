import { PropsWithChildren } from 'react'
import Header from './Header'

interface Props extends PropsWithChildren {
  title: string
}

export const Container = ({ title, children }: Props) => {
  return (
    <div className='p-6 select-none'>
      <Header title={title} />
      {children}
    </div>
  )
}
