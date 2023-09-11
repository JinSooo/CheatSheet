import { Store } from 'tauri-plugin-store-api'

// 初始化配置文件
export const initConfigStore = async () => {
  const { join, appConfigDir } = await import('@tauri-apps/api/path')
  const dir = await appConfigDir()
  const configPath = await join(dir, 'config.json')
  console.log('configPath:', configPath)

  return new Store(configPath)
}
