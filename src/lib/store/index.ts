import { createContext } from 'react'
import { OSType } from '../types'
import { Store } from 'tauri-plugin-store-api'

interface GlobalStore {
  os: OSType
  configStore: Store
}

const defaultValue: GlobalStore = {
  os: OSType.Windows, // 操作系统
  configStore: new Store(''),
}

export const StoreContext = createContext(defaultValue)

export const StoreProvider = StoreContext.Provider
