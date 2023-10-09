'use client'

import useTheme from '@/lib/hooks/useTheme'
import { emit } from '@tauri-apps/api/event'
import { Monitor, WebviewWindow } from '@tauri-apps/api/window'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import Checkbox from '../common/Checkbox'
import { Container } from '../common/Container'
import Range from '../common/Range'
import Select from '../common/Select'
import { Config } from '@/lib/types'
import { StoreContext } from '@/lib/store'
import { debounce } from '@/lib/utils/util'
import { Store } from 'tauri-plugin-store-api'
import Category from '../common/Category'

const General = () => {
  const { setTheme } = useTheme()
  const { configStore } = useContext(StoreContext)
  const mainWindow = useRef<WebviewWindow | null>()
  const monitor = useRef<Monitor | null>()
  // 默认配置
  const [defaultConfig, setDefaultConfig] = useState<Config>({})
  // 系统字体列表
  const [fontFamilies, setFontFamilies] = useState<string[]>([])

  const initFontFamilies = async () => {
    const { invoke } = await import('@tauri-apps/api')
    const fontFamilies = await invoke('get_font_families')
    console.log('🎉🎉🎉', 'Font Families', fontFamilies)
    setFontFamilies(fontFamilies as string[])
  }

  const initConfig = async (configStore: Store) => {
    // 获取配置文件信息
    const config: Config = {}
    config.autoStart = await configStore.get('autoStart')
    config.checkUpdate = await configStore.get('checkUpdate')
    config.windowOpacity = await configStore.get('windowOpacity')
    config.windowBorderRadius = await configStore.get('windowBorderRadius')
    config.windowSizeRatio = await configStore.get('windowSizeRatio')
    config.theme = await configStore.get('theme')
    config.trayLeftClick = await configStore.get('trayLeftClick')
    config.fontFamily = await configStore.get('fontFamily')
    setDefaultConfig(config)
    console.log('🎉🎉🎉', 'General Config', config)
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
    saveConfigStore('theme', e.target.value)
  }

  // 字体
  const handleFontFamilyChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    await emit('font_family', e.target.value)
    saveConfigStore('fontFamily', e.target.value)
  }

  // 窗口透明度
  const handleWindowOpacity = async (e: ChangeEvent<HTMLInputElement>) => {
    await emit('window_opacity', +e.target.value / 10)
    saveConfigStore('windowOpacity', +e.target.value)
  }

  // 窗口圆角
  const handleWindowBorderRadius = async (e: ChangeEvent<HTMLInputElement>) => {
    await emit('window_border_radius', +e.target.value)
    saveConfigStore('windowBorderRadius', +e.target.value)
  }

  // 窗口大小百分比
  const handleWindowSizeRatio = async (e: ChangeEvent<HTMLInputElement>) => {
    const { PhysicalSize } = await import('@tauri-apps/api/window')
    const ratio = +e.target.value
    await mainWindow.current?.setSize(
      new PhysicalSize(
        Math.trunc((monitor.current?.size.width ?? 1920) * ratio),
        Math.trunc((monitor.current?.size.height ?? 1080) * ratio),
      ),
    )
    await mainWindow.current?.center()
    saveConfigStore('windowSizeRatio', +e.target.value)
  }

  // 托盘左击事件
  const handleTrayClick = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { invoke } = await import('@tauri-apps/api')
    await invoke('left_click_type', { lcType: e.target.value })
    saveConfigStore('trayLeftClick', e.target.value)
  }

  // 开机自启
  const handleAppAutostart = async (e: ChangeEvent<HTMLInputElement>) => {
    const { invoke } = await import('@tauri-apps/api')
    if (e.target.checked) {
      await invoke('plugin:autostart|enable')
    } else {
      await invoke('plugin:autostart|disable')
    }
    saveConfigStore('autoStart', e.target.checked)
  }

  // 检查更新
  const handleAppCheckStart = async (e: ChangeEvent<HTMLInputElement>) => {
    saveConfigStore('checkUpdate', e.target.checked)
  }

  useEffect(() => {
    initConfig(configStore)
  }, [configStore])

  useEffect(() => {
    init()
    initFontFamilies()
  }, [])

  // 随机取一个属性，判断config是否加载完成
  if (!defaultConfig.theme) return <></>

  return (
    <Container>
      <div className='flex flex-col gap-6'>
        <Category
          title='系统设置'
          category={[
            {
              name: '开机自启',
              component: <Checkbox defaultChecked={defaultConfig.autoStart} onChange={handleAppAutostart} />,
            },
            {
              name: '启动时检查更新',
              component: <Checkbox defaultChecked={defaultConfig.checkUpdate} onChange={handleAppCheckStart} />,
            },
          ]}
        />
        <Category
          title='窗口设置'
          category={[
            {
              name: '窗口透明度',
              component: (
                <Range defaultValue={defaultConfig.windowOpacity} min={0} max={10} onChange={handleWindowOpacity} />
              ),
            },
            {
              name: '窗口大小百分比',
              component: (
                <Range
                  defaultValue={defaultConfig.windowSizeRatio}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={handleWindowSizeRatio}
                />
              ),
            },
            {
              name: '窗口圆角大小',
              component: (
                <Range
                  defaultValue={defaultConfig.windowBorderRadius}
                  min={0}
                  max={100}
                  onChange={handleWindowBorderRadius}
                />
              ),
            },
          ]}
        />
        <Category
          title='外观设置'
          category={[
            {
              name: '主题',
              component: (
                <Select
                  defaultValue={defaultConfig.theme}
                  items={[
                    { key: 'system', description: '跟随系统' },
                    { key: 'light', description: '白天模式' },
                    { key: 'dark', description: '夜间模式' },
                  ]}
                  onChange={handleThemeChange}
                />
              ),
            },
            {
              name: '字体',
              component: (
                <Select
                  defaultValue={defaultConfig.fontFamily}
                  items={fontFamilies.map((fontFamily) => ({ key: fontFamily, description: fontFamily })) ?? []}
                  onChange={handleFontFamilyChange}
                />
              ),
            },
          ]}
        />
        <Category
          title='事件设置'
          category={[
            {
              name: '托盘点击事件',
              component: (
                <Select
                  defaultValue={defaultConfig.trayLeftClick}
                  items={[
                    { key: 'none', description: '空' },
                    { key: 'cheatsheet', description: 'CheatSheet窗口' },
                    { key: 'config', description: '配置窗口' },
                  ]}
                  onChange={handleTrayClick}
                />
              ),
            },
          ]}
        />
      </div>
    </Container>
  )
}

export default General
