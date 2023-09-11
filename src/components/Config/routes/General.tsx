'use client'

import useTheme from '@/lib/hooks/useTheme'
import { emit } from '@tauri-apps/api/event'
import { Monitor, WebviewWindow } from '@tauri-apps/api/window'
import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import Checkbox from '../common/Checkbox'
import { Container } from '../common/Container'
import Range from '../common/Range'
import Select from '../common/Select'
import { Store } from '@/lib/utils/store'
import { Config } from '@/lib/types'
import { StoreContext } from '@/lib/store'
import { debounce } from '@/lib/utils/util'

const General = () => {
  const { setTheme } = useTheme()
  const { configStore } = useContext(StoreContext)
  const mainWindow = useRef<WebviewWindow | null>()
  const monitor = useRef<Monitor | null>()
  // 默认配置
  const [defaultConfig, setDefaultConfig] = useState<Config>({})

  const initConfig = async (configStore: Store) => {
    // 获取配置文件信息
    const config: Config = {}
    config.autoStart = await configStore.get('autoStart')
    config.checkUpdate = await configStore.get('checkUpdate')
    config.windowOpacity = await configStore.get('windowOpacity')
    config.windowBorderRadius = await configStore.get('windowBorderRadius')
    config.windowSize = await configStore.get('windowSize')
    config.theme = await configStore.get('theme')
    config.trayLeftClick = await configStore.get('trayLeftClick')
    setDefaultConfig(config)
    console.log('🎉🎉🎉', 'General Config', 'config')
  }

  const init = async () => {
    const { getAll, currentMonitor } = await import('@tauri-apps/api/window')
    // 获取CheatSheet窗口
    mainWindow.current = getAll().find((window) => window.label === 'main')
    // 获取当前显示器信息
    monitor.current = await currentMonitor()
  }

  // 防抖保存，避免多次存储
  const saveConfigStore = debounce(async (key: string, value: unknown) => {
    await configStore.set(key, value)
    await configStore.save()
  }, 200)

  // 主题
  const handleThemeChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
    await saveConfigStore('theme', e.target.value)
  }
  // 窗口透明度
  const handleWindowOpacity = async (e: ChangeEvent<HTMLInputElement>) => {
    await emit('window_opacity', +e.target.value / 10)
    await saveConfigStore('windowOpacity', e.target.value)
  }
  // 窗口圆角
  const handleWindowBorderRadius = async (e: ChangeEvent<HTMLInputElement>) => {
    await emit('window_border_radius', +e.target.value)
    await saveConfigStore('windowBorderRadius', e.target.value)
  }
  // 窗口大小
  const handleWindowSize = async (e: ChangeEvent<HTMLInputElement>) => {
    const { LogicalSize } = await import('@tauri-apps/api/window')
    const ratio = +e.target.value / 100
    mainWindow.current?.setSize(
      new LogicalSize((monitor.current?.size.width ?? 1920) * ratio, (monitor.current?.size.height ?? 1080) * ratio),
    )
    mainWindow.current?.center()
    await saveConfigStore('windowSize', +e.target.value)
  }
  // 托盘左击事件
  const handleTrayClick = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { invoke } = await import('@tauri-apps/api')
    await invoke('left_click_type', { lcType: e.target.value })
    await saveConfigStore('trayLeftClick', e.target.value)
  }
  // 开机自启
  const handleAppAutostart = async (e: ChangeEvent<HTMLInputElement>) => {
    const { invoke } = await import('@tauri-apps/api')
    if (e.target.checked) {
      await invoke('plugin:autostart|enable')
    } else {
      await invoke('plugin:autostart|disable')
    }
    await saveConfigStore('autoStart', e.target.checked)
  }
  // 检查更新
  const handleAppCheckStart = async (e: ChangeEvent<HTMLInputElement>) => {
    await saveConfigStore('checkUpdate', e.target.checked)
  }

  useEffect(() => {
    initConfig(configStore)
  }, [configStore])

  useEffect(() => {
    init()
  }, [])

  // 随机取一个属性，判断config是否加载完成
  if (!defaultConfig.theme) return <></>

  return (
    <Container title='通用'>
      <ul className='config-menu'>
        <li>
          <p>开机自启</p>
          <Checkbox defaultChecked={defaultConfig.autoStart} onChange={handleAppAutostart} />
        </li>
        <li>
          <p>启动时检查更新</p>
          <Checkbox defaultChecked={defaultConfig.checkUpdate} onChange={handleAppCheckStart} />
        </li>
        <li>
          <p>窗口透明度</p>
          <Range defaultValue={defaultConfig.windowOpacity} min={0} max={10} onChange={handleWindowOpacity} />
        </li>
        <li>
          <p>窗口大小百分比</p>
          <Range defaultValue={defaultConfig.windowSize} min={50} max={100} onChange={handleWindowSize} />
        </li>
        <li>
          <p>窗口圆角大小</p>
          <Range
            defaultValue={defaultConfig.windowBorderRadius}
            min={0}
            max={100}
            onChange={handleWindowBorderRadius}
          />
        </li>
        <li>
          <p>主题</p>
          <Select
            defaultValue={defaultConfig.theme}
            items={[
              { key: 'system', description: '跟随系统' },
              { key: 'light', description: '白天模式' },
              { key: 'dark', description: '夜间模式' },
            ]}
            onChange={handleThemeChange}
          />
        </li>
        <li>
          <p>托盘点击事件</p>
          <Select
            defaultValue={defaultConfig.trayLeftClick}
            items={[
              { key: 'none', description: '空' },
              { key: 'cheatsheet', description: 'CheatSheet窗口' },
              { key: 'config', description: '配置窗口' },
            ]}
            onChange={handleTrayClick}
          />
        </li>
      </ul>
    </Container>
  )
}

export default General
