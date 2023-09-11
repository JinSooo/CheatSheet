'use client'

import { StoreContext } from '@/lib/store'
import { Config, OSType } from '@/lib/types'
import { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Checkbox from '../common/Checkbox'
import { Container } from '../common/Container'
import Keyboard from '../common/Keyboard'
import { Store } from '@/lib/utils/store'

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
  const { os, configStore } = useContext(StoreContext)
  const keyBoardTool = useMemo(() => (os === OSType.Windows ? keyBoardTooltipWindows : keyBoardTooltipMac), [os])
  // 默认配置
  const [defaultConfig, setDefaultConfig] = useState<Config>({})
  // 保存当前生效的快捷键
  const currentCheatSheetShortCut = useRef('F2')
  const currentActiveWindowShortCut = useRef('Ctrl+F2')
  // 记录快捷键组合键
  const [cheatSheetShortCut, setCheatSheetShortCut] = useState(currentCheatSheetShortCut.current)
  const [activeWindowShortCut, setActiveWindowShortCut] = useState(currentActiveWindowShortCut.current)

  async function initConfig(configStore: Store) {
    // 获取配置文件信息
    const config: Config = {}
    config.cheatSheetShortCut = await configStore.get('cheatSheetShortCut')
    config.activeWindowShortCut = await configStore.get('activeWindowShortCut')
    // 显示对应快捷键
    currentCheatSheetShortCut.current = config.cheatSheetShortCut
    currentActiveWindowShortCut.current = config.activeWindowShortCut
    setCheatSheetShortCut(config.cheatSheetShortCut)
    setActiveWindowShortCut(config.activeWindowShortCut)
    setDefaultConfig(config)
    console.log('🎉🎉🎉', 'HotKey Config', 'config')
  }

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
      if (activeWindowShortCut === combKey) return
      setActiveWindowShortCut(combKey)
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
        setActiveWindowShortCut(currentActiveWindowShortCut.current)
      }
    }, 250)
  }
  // 修改CheatSheet快捷键
  const handleCheatSheetShortCutSubmit = async () => {
    console.log('🎉🎉🎉', 'cheatsheet shortcut', cheatSheetShortCut)
    currentCheatSheetShortCut.current = cheatSheetShortCut
    const { invoke } = await import('@tauri-apps/api')
    await invoke('register_shortcut_by_frontend', { app: 'cheatsheet', shortcut: cheatSheetShortCut })
    await configStore.set('cheatSheetShortCut', cheatSheetShortCut)
    await configStore.save()
  }
  // 修改Config快捷键
  const handleActiveWindowSubmit = async () => {
    console.log('🎉🎉🎉', 'activeWindow shortcut', activeWindowShortCut)
    currentActiveWindowShortCut.current = activeWindowShortCut
    const { invoke } = await import('@tauri-apps/api')
    await invoke('register_shortcut_by_frontend', { app: 'active_window', shortcut: activeWindowShortCut })
    await configStore.set('activeWindowShortCut', activeWindowShortCut)
    await configStore.save()
  }

  useEffect(() => {
    initConfig(configStore)
  }, [configStore])

  // 随机取一个属性，判断config是否加载完成
  if (!defaultConfig.cheatSheetShortCut) return <></>

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
          <p>当前聚焦应用</p>
          <Keyboard
            command={activeWindowShortCut}
            tooltip={keyBoardTool}
            // @ts-ignore
            onKeyDown={(e) => handleKeyDown(e, 'active_window')}
            onBlur={() => handleBlur('active_window')}
            submit={handleActiveWindowSubmit}
          />
        </li>
      </ul>
    </Container>
  )
}

export default Hotkey
