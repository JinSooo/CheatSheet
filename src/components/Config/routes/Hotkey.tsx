'use client'

import { useState } from 'react'
import Checkbox from '../common/Checkbox'
import { Container } from '../common/Container'
import Keyboard from '../common/Keyboard'

const forbiddenKeys = [
  'control',
  'shift',
  'alt',
  'capslock',
  'backspace',
  'enter',
  'delete',
  'tab',
  'insert',
  'escape',
  'numlock',
  'scrolllock',
]

const Hotkey = () => {
  const [cheatSheetShortCut, setCheatSheetShortCut] = useState('')

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault()

    let combKey = ''
    if (e.ctrlKey) combKey += 'Ctrl+'
    if (e.shiftKey) combKey += 'Shift+'
    if (e.altKey) combKey += 'Alt+'
    if (e.metaKey) combKey += 'Cmd+'
    // 禁止特殊键位
    if (forbiddenKeys.includes(e.key.toLowerCase())) return
    // 禁止单键，但可以使用F1~F12
    if (!combKey && !(e.key.length > 1 && e.key.startsWith('F'))) return
    combKey = combKey + e.key[0].toUpperCase() + e.key.slice(1)
    setCheatSheetShortCut(combKey)
  }

  return (
    <Container title='快捷键'>
      <ul className='config-menu'>
        <li>
          <p>显示CheatSheet</p>
          {/* @ts-ignore */}
          <Keyboard value={cheatSheetShortCut} onKeyDown={handleKeyDown} />
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
