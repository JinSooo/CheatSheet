import WindowBar from '../common/WindowBar'
import Image from 'next/image'

const Header = () => {
  return (
    <WindowBar className='p-[6px]'>
      <Image src='imgs/icon.png' width={16} height={16} alt='icon' />
      <p className='ml-[6px] text-sm'>检查更新</p>
    </WindowBar>
  )
}

export default Header
