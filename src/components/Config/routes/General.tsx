'use client'

import useTheme from '@/lib/hooks/useTheme'
import { emit } from '@tauri-apps/api/event'
import { Monitor, WebviewWindow } from '@tauri-apps/api/window'
import { ChangeEvent, useEffect, useRef } from 'react'
import Checkbox from '../common/Checkbox'
import { Container } from '../common/Container'
import Range from '../common/Range'
import Select from '../common/Select'

const General = () => {
  const { setTheme } = useTheme()
  const mainWindow = useRef<WebviewWindow | null>()
  const monitor = useRef<Monitor | null>()

  const init = async () => {
    const { getAll, currentMonitor } = await import('@tauri-apps/api/window')
    // 获取CheatSheet窗口
    mainWindow.current = getAll().find((window) => window.label === 'main')
    // 获取当前显示器信息
    monitor.current = await currentMonitor()
  }

  // 主题
  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
  }
  // 窗口透明度
  const handleWindowOpacity = (e: ChangeEvent<HTMLInputElement>) => {
    emit('background_opacity', +e.target.value / 10)
  }
  // 窗口圆角
  const handleWindowBorderRadius = (e: ChangeEvent<HTMLInputElement>) => {
    emit('window_border_radius', +e.target.value)
  }
  // 窗口置顶
  const handleWindowAlwaysOnTop = (e: ChangeEvent<HTMLInputElement>) => {
    mainWindow.current?.setAlwaysOnTop(e.target.checked)
  }
  // 窗口大小
  const handleWindowSize = async (e: ChangeEvent<HTMLInputElement>) => {
    const { LogicalSize } = await import('@tauri-apps/api/window')
    const ratio = +e.target.value / 100
    mainWindow.current?.setSize(
      new LogicalSize((monitor.current?.size.width ?? 1920) * ratio, (monitor.current?.size.height ?? 1080) * ratio),
    )
    mainWindow.current?.center()
  }
  // 托盘左击事件
  const handleTrayClick = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { invoke } = await import('@tauri-apps/api')
    invoke('left_click_type', { lcType: e.target.value })
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Container title='通用'>
      <ul className='config-menu'>
        <li>
          <p>开机启动</p>
          <Checkbox />
        </li>
        <li>
          <p>启动时检查更新</p>
          <Checkbox />
        </li>
        <li>
          <p>窗口置顶</p>
          <Checkbox onChange={handleWindowAlwaysOnTop} />
        </li>
        <li>
          <p>窗口透明度</p>
          <Range min={0} max={10} onChange={handleWindowOpacity} />
        </li>
        <li>
          <p>窗口大小百分比</p>
          <Range min={50} max={100} onChange={handleWindowSize} />
        </li>
        <li>
          <p>窗口圆角大小</p>
          <Range min={0} max={100} onChange={handleWindowBorderRadius} />
        </li>
        <li>
          <p>主题</p>
          <Select
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
            items={[
              { key: '0', description: '空' },
              { key: '1', description: 'CheatSheet窗口' },
              { key: '2', description: '配置窗口' },
            ]}
            onChange={handleTrayClick}
          />
        </li>
      </ul>
    </Container>
  )
}

export default General
