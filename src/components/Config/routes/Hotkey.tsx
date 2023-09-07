'use client'

import { StoreContext } from '@/lib/store'
import { OSType } from '@/lib/types'
import { convertMacShortCut, convertShortCutCommand } from '@/lib/utils'
import { useContext, useMemo, useState } from 'react'
import Checkbox from '../common/Checkbox'
import { Container } from '../common/Container'
import Keyboard from '../common/Keyboard'

// 禁用特殊按键的组合键
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
// 按键提示信息
const keyBoardTooltipWindows = '1. 先按功能键(Ctrl、Alt、Shift),再按其他普通键\n2. 按F1-F12单键'
const keyBoardTooltipMac = '1. 先按功能键(Command、Control、Alt、Shift),再按其他普通键\n2. 按F1-F12单键'

const Hotkey = () => {
  const { os } = useContext(StoreContext)
  const keyBoardTool = useMemo(() => (os === OSType.Windows ? keyBoardTooltipWindows : keyBoardTooltipMac), [os])
  const [cheatSheetShortCut, setCheatSheetShortCut] = useState('')

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault()

    let combKey = ''
    if (e.metaKey) combKey += 'Cmd+'
    if (e.ctrlKey) combKey += 'Ctrl+'
    if (e.shiftKey) combKey += 'Shift+'
    if (e.altKey) combKey += 'Alt+'
    // 禁止特殊键位
    if (forbiddenKeys.includes(e.key.toLowerCase())) return
    // 禁止单键，但可以使用F1~F12
    if (!combKey && !(e.key.length > 1 && e.key.startsWith('F'))) return

    combKey = combKey + e.key[0].toUpperCase() + e.key.slice(1)
    // Mac下键位转换成对应的图标
    if (os === OSType.Mac) combKey = convertMacShortCut(combKey)
    // 优化，相同则不更新
    if (cheatSheetShortCut === combKey) return
    setCheatSheetShortCut(combKey)
  }

  return (
    <Container title='快捷键'>
      <ul className='config-menu'>
        <li>
          <p>显示CheatSheet</p>
          {/* @ts-ignore */}
          <Keyboard value={cheatSheetShortCut} onKeyDown={handleKeyDown} tooltip={keyBoardTool} />
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
