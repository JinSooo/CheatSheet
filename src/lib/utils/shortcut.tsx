import {BaseDirectory, FileEntry, readDir, readTextFile} from '@tauri-apps/api/fs'
import {OSType, ShortCut, ShortCutKind} from '../types'

const convertOSName = (os: OSType) => {
  switch (os) {
    case OSType.Windows:
      return 'Windows'
    case OSType.Mac:
      return 'Mac'
    case OSType.Linux:
      return 'Linux'
  }
}

// 读取操作系统快捷键数据
export const readOSShortCut = async (os: OSType): Promise<ShortCut> => {
  const content = await readTextFile(`shortcuts/${convertOSName(os)}.json`, {
    dir: BaseDirectory.Resource,
  })
  return JSON.parse(content)
}

// 读取应用快捷键数据
export const readAppShortCut = async (name: string): Promise<ShortCut | null> => {
  try {
    const content = await readTextFile(`shortcuts/${name}.json`, {
      dir: BaseDirectory.Resource,
    })
    return JSON.parse(content)
  } catch (error) {
    return null
  }
}

// 读取当前已支持的应用
export const readShortCutDir = async (): Promise<FileEntry[]> => {
  return await readDir('shortcuts', {
    dir: BaseDirectory.Resource,
  })
}

// Mac系统需要转换的图标
const commandMapMac = new Map<string, string | JSX.Element>([
  ['Ctrl', '⌃'],
  ['Control', '⌃'],
  ['Command', '⌘'],
  ['Cmd', '⌘'],
  ['Alt', '⌥'],
  ['Option', '⌥'],
  ['Shift', '⇧'],
  ['Esc', '⎋'],
  ['Enter', '↩︎'],
])

// Windows系统需要转换的图标
const commandMapWin = new Map<string, string | JSX.Element>([
  ['Win', <span className='iconfont icon-windows-fill' key='Win'/>],
  ['Enter', '⏎'],
])

// 公共按键转换的图标
const commandMap = new Map<string, string | JSX.Element>([
  ['Space', <span className='iconfont icon-space' key='Space'/>],
  ['Backspace', '⌫'],
  ['Left', '←'],
  ['Right', '→'],
  ['Top', '↑'],
  ['Bottom', '↓'],
])

// 将快捷键转换为对应的图标和字符
const convertKeyToIcon = (os: OSType, key: string) => {
  // 对键位做图标转换
  if (os === OSType.Mac) {
    if (commandMapMac.has(key)) {
      return commandMapMac.get(key) ?? ''
    }
  } else if (os === OSType.Windows) {
    if (commandMapWin.has(key)) {
      return commandMapWin.get(key) ?? ''
    }
  }

  // 公共
  if (commandMap.has(key)) {
    return commandMap.get(key) ?? ''
  }

  return key
}

// 将字符串转换成快捷键
export const convertShortCutCommand = (os: OSType, command: string): ShortCutKind => {
  const ans: (JSX.Element | string)[][] = []

  // 组合快捷键
  // command.length > 1 用于避免单个字符的快捷键说明
  if (command.indexOf('&') !== -1 && command.length > 1) {
    const group = command.split(' & ')
    for (let i = 0; i < group.length; i++) {
      const arr = group[i].split('+') as (JSX.Element | string)[]
      for (let j = 0; j < arr.length; j++) {
        arr[j] = convertKeyToIcon(os, arr[j] as string)
      }
      ans.push(arr)
    }

    return {
      type: 'combination',
      arr: ans,
    }
  }
  // 多功能快捷键
  else if (command.indexOf('|') !== -1 && command.length > 1) {
    const group = command.split(' | ')
    for (let i = 0; i < group.length; i++) {
      const arr = group[i].split('+') as (JSX.Element | string)[]
      for (let j = 0; j < arr.length; j++) {
        arr[j] = convertKeyToIcon(os, arr[j] as string)
      }
      ans.push(arr)
    }

    return {
      type: 'multi',
      arr: ans,
    }
  }
  // 正常快捷键
  else {
    const arr = command.split('+') as (JSX.Element | string)[]
    for (let i = 0; i < arr.length; i++) {
      arr[i] = convertKeyToIcon(os, arr[i] as string)
    }
    ans.push(arr)

    return {
      type: 'normal',
      arr: ans,
    }
  }
}
