import Checkbox from '../common/Checkbox'
import { Container } from '../common/Container'
import Keyboard from '../common/Keyboard'

const Hotkey = () => {
  return (
    <Container title='快捷键'>
      <ul className='config-menu'>
        <li>
          <p>显示CheatSheet</p>
          <Keyboard />
        </li>
        <li>
          <p>当前应用</p>
          <Keyboard />
        </li>
        <li>
          <p>禁用CheatSheet快捷键</p>
          <Checkbox />
        </li>
        <li>
          <p>禁用当前应用快捷键</p>
          <Checkbox />
        </li>
      </ul>
    </Container>
  )
}

export default Hotkey
