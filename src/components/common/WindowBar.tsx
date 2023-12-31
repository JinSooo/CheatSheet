import { HTMLAttributes, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren, HTMLAttributes<HTMLElement> {}

const WindowBar = ({ className, children }: Props) => {
  return (
    <header className={`bg-[var(--background-fore)] select-none flex items-center w-full ${className}`}>
      {children}
    </header>
  )
}

export default WindowBar
