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
  const entries = await readDir('shortcuts', {
    dir: BaseDirectory.Resource,
  })
  return entries
}

const commandMapMac = new Map([
  ['Control', '⌃'],
  ['Command', '⌘'],
  ['Cmd', '⌘'],
  ['Alt', '⌥'],
  ['Shift', '⇧'],
])

const commandMapWin = new Map([
  [
    'Win',
    <span className='iconfont' key={'win'}>
      &#xe882;
    </span>,
  ],
])

// 将快捷键转换为对应的图标和字符
export const convertShortCutCommand = (os: OSType, command: string) => {
  if (!command) return []
  const arr = command.split('+')
  const ans: (JSX.Element | string)[] = new Array(arr.length)

  // 对键位做图标转换
  if (os === OSType.Mac) {
    for (let i = 0; i < arr.length; i++) {
      if (commandMapMac.has(arr[i])) {
        ans[i] = commandMapMac.get(arr[i]) ?? ''
      } else {
        ans[i] = arr[i]
      }
    }
  } else if (os === OSType.Windows) {
    for (let i = 0; i < arr.length; i++) {
      if (commandMapWin.has(arr[i])) {
        ans[i] = commandMapWin.get(arr[i]) ?? ''
      } else {
        ans[i] = arr[i]
      }
    }
  }

  return ans
}
