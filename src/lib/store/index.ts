import { createContext } from 'react'
import { OSType } from '../types'

interface Store {
  os: OSType
  appName: string
}

const defaultValue: Store = {
  os: OSType.Windows, // 操作系统
  appName: '', // 聚焦应用
}

export const StoreContext = createContext(defaultValue)

export const StoreProvider = StoreContext.Provider
