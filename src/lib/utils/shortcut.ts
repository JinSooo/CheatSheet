import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs'
import { OSType, ShortCut } from '../types'

// 读取应用快捷键数据
export const readShortCut = async (name: string): Promise<ShortCut> => {
  const content = await readTextFile(`resources/shortcuts/${name}.json`, {
    dir: BaseDirectory.Resource,
  })
  const shortcut = JSON.parse(content)
  return shortcut
}

const commandMap = new Map([
  ['Control', '⌃'],
  ['Command', '⌘'],
  ['Alt', '⌥'],
  ['Shift', '⇧'],
])

// 将快捷键转换为对应的图标和字符
export const convertShortCutCommand = (os: OSType, command: string) => {
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
