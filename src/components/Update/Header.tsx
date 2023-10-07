import WindowBar from '../common/WindowBar'

const Header = () => {
  return (
    <WindowBar className='p-[6px] justify-center bg-[var(--background-header)] shadow-sm'>
      <p className='ml-[6px] text-sm font-semibold'>软件更新</p>
    </WindowBar>
  )
}

export default Header
