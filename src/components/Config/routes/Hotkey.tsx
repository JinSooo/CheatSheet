'use client'

import { StoreContext } from '@/lib/store'
import { OSType } from '@/lib/types'
import { convertMacShortCut, convertShortCutCommand } from '@/lib/utils'
import { config } from 'process'
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
  const [configShortCut, setConfigShortCut] = useState('')

  // 处理键盘按键的组合键
  const handleKeyDown = (e: KeyboardEvent, target: 'cheatsheet' | 'config') => {
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
    // 优化，相同则不更新
    if (target === 'cheatsheet') {
      if (cheatSheetShortCut === combKey) return
      setCheatSheetShortCut(combKey)
    } else if (target === 'config') {
      if (configShortCut === combKey) return
      setConfigShortCut(combKey)
    }
  }
  // 修改CheatSheet快捷键
  const handleCheatSheetShortCutSubmit = () => {
    console.log('🎉🎉🎉', 'cheatsheet shortcut', cheatSheetShortCut)
  }
  // 修改Config快捷键
  const handleConfigSubmit = () => {
    console.log('🎉🎉🎉', 'config shortcut', configShortCut)
  }

  return (
    <Container title='快捷键'>
      <ul className='config-menu'>
        <li>
          <p>显示CheatSheet</p>
          <Keyboard
            command={cheatSheetShortCut}
            tooltip={keyBoardTool}
            // @ts-ignore
            onKeyDown={(e) => handleKeyDown(e, 'cheatsheet')}
            submit={handleCheatSheetShortCutSubmit}
          />
        </li>
        <li>
          <p>当前应用</p>
          <Keyboard
            command={configShortCut}
            tooltip={keyBoardTool}
            // @ts-ignore
            onKeyDown={(e) => handleKeyDown(e, 'config')}
            submit={handleConfigSubmit}
          />
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
