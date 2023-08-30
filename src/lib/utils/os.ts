import { OsType } from '@tauri-apps/api/os'
import { OSType } from '../types'

// 获取操作系统类型
export const getOSType = async () => {
  const { type } = await import('@tauri-apps/api/os')
  const os = await type()
  return convert(os)
}

// OsType -> OSType
const convert = (os: OsType) => {
  switch (os) {
    case 'Windows_NT':
      return OSType.Windows
    case 'Darwin':
      return OSType.Mac
    case 'Linux':
      return OSType.Linux
  }
}
