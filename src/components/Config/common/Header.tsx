interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  return (
    <header className='mb-4'>
      <p className='text-2xl text-center font-semibold'>{title}</p>
    </header>
  )
}

export default Header
