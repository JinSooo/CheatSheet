import { BaseDirectory, FileEntry, readDir, readTextFile } from '@tauri-apps/api/fs'
import { OSType, ShortCut } from '../types'

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

// 读取应用快捷键数据
export const readShortCut = async (name: string, os: OSType): Promise<ShortCut> => {
  let content = ''
  try {
    content = await readTextFile(`shortcuts/${name}.json`, {
      dir: BaseDirectory.Resource,
    })
  } catch (err) {
    content = await readTextFile(`shortcuts/${convertOSName(os)}.json`, {
      dir: BaseDirectory.Resource,
    })
  }
  const shortcut = JSON.parse(content)
  return shortcut
}

// 读取当前已支持的应用
export const readShortCutDir = async (): Promise<FileEntry[]> => {
  const entries = await readDir('shortcuts', {
    dir: BaseDirectory.Resource,
  })
  return entries
}

const commandMap = new Map([
  ['Control', '⌃'],
  ['Ctrl', '⌃'],
  ['Command', '⌘'],
  ['Cmd', '⌘'],
  ['Alt', '⌥'],
  ['Shift', '⇧'],
  ['Caps', '⇪'],
  // ['Win', '⊞'],
])

// 将快捷键转换为对应的图标和字符
export const convertShortCutCommand = (os: OSType, command: string) => {
  if (!command) return []
  const arr = command.split('+')

  // 对Mac的键位做图标转换
  if (os === OSType.Mac) {
    for (let i = 0; i < arr.length; i++) {
      if (commandMap.has(arr[i])) {
        arr[i] = commandMap.get(arr[i]) ?? ''
      }
    }
  }

  return arr
}

// 将快捷键转换为Mac的图标和字符
export const convertMacShortCut = (command: string) => {
  const arr = command.split('+')

  for (let i = 0; i < arr.length; i++) {
    if (commandMap.has(arr[i])) {
      arr[i] = commandMap.get(arr[i]) ?? ''
    }
  }

  return arr.join('+')
}
