import { PropsWithChildren } from 'react'

export const Container = ({ children }: PropsWithChildren) => {
  return <div className='p-4 pt-6 select-none'>{children}</div>
}
