import { createContext } from 'react'
import { OSType } from '../types'
import {Store} from "tauri-plugin-store-api";

interface GlobalStore {
  os: OSType
  appName: string
  configStore: Store
}

const defaultValue: GlobalStore = {
  os: OSType.Windows, // 操作系统
  appName: '', // 聚焦应用
  configStore: new Store(''),
}

export const StoreContext = createContext(defaultValue)

export const StoreProvider = StoreContext.Provider
