'use client'

import { StoreContext } from '@/lib/store'
import { OSType } from '@/lib/types'
import { convertMacShortCut, convertShortCutCommand } from '@/lib/utils'
import { config } from 'process'
import { ChangeEvent, useContext, useMemo, useRef, useState } from 'react'
import Checkbox from '../common/Checkbox'
import { Container } from '../common/Container'
import Keyboard from '../common/Keyboard'

type ShortCutKind = 'cheatsheet' | 'active_window'

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
  // 保存当前生效的快捷键
  const currentCheatSheetShortCut = useRef('F2')
  const currentConfigShortCut = useRef('Ctrl+F2')
  // 记录快捷键组合键
  const [cheatSheetShortCut, setCheatSheetShortCut] = useState(currentCheatSheetShortCut.current)
  const [configShortCut, setConfigShortCut] = useState(currentConfigShortCut.current)

  // 处理键盘按键的组合键
  const handleKeyDown = (e: KeyboardEvent, target: ShortCutKind) => {
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
    } else if (target === 'active_window') {
      if (configShortCut === combKey) return
      setConfigShortCut(combKey)
    }
  }
  // 失去焦点后重置为当前生效的快捷键
  const handleBlur = (target: ShortCutKind) => {
    /**
     * TODO：这不是一种很好的处理方式，不确定性比较大，需要优化
     * 延时恢复，因为点击submit提交的话，会导致input失去焦点，所以要先等submit更新当前生效快捷键
     */
    setTimeout(() => {
      if (target === 'cheatsheet') {
        setCheatSheetShortCut(currentCheatSheetShortCut.current)
      } else if (target === 'active_window') {
        setConfigShortCut(currentConfigShortCut.current)
      }
    }, 100)
  }
  // 修改CheatSheet快捷键
  const handleCheatSheetShortCutSubmit = async () => {
    console.log('🎉🎉🎉', 'cheatsheet shortcut', cheatSheetShortCut)
    currentCheatSheetShortCut.current = cheatSheetShortCut
    const { invoke } = await import('@tauri-apps/api')
    await invoke('register_hotkey_with_shortcut', { kind: 'cheatsheet', shortcut: cheatSheetShortCut })
  }
  // 修改Config快捷键
  const handleConfigSubmit = async () => {
    console.log('🎉🎉🎉', 'config shortcut', configShortCut)
    currentConfigShortCut.current = configShortCut
    const { invoke } = await import('@tauri-apps/api')
    await invoke('register_hotkey_with_shortcut', { kind: 'active-window', shortcut: configShortCut })
  }
  // 禁用快捷键
  const handleForbidShortCut = async (e: ChangeEvent<HTMLInputElement>, kind: ShortCutKind) => {
    const { invoke } = await import('@tauri-apps/api')
    if (e.target.checked) {
      await invoke('unregister_hotkey', { kind })
    } else {
      await invoke('register_hotkey', { kind })
    }
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
            onBlur={() => handleBlur('cheatsheet')}
            submit={handleCheatSheetShortCutSubmit}
          />
        </li>
        <li>
          <p>当前应用</p>
          <Keyboard
            command={configShortCut}
            tooltip={keyBoardTool}
            // @ts-ignore
            onKeyDown={(e) => handleKeyDown(e, 'active_window')}
            onBlur={() => handleBlur('active_window')}
            submit={handleConfigSubmit}
          />
        </li>
        <li>
          <p>禁用CheatSheet快捷键</p>
          <Checkbox onChange={(e) => handleForbidShortCut(e, 'cheatsheet')} />
        </li>
        <li>
          <p>禁用当前应用快捷键</p>
          <Checkbox onChange={(e) => handleForbidShortCut(e, 'active_window')} />
        </li>
      </ul>
    </Container>
  )
}

export default Hotkey
