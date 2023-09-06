'use client'

import useTheme from '@/lib/hooks/useTheme'
import { emit } from '@tauri-apps/api/event'
import { ChangeEvent } from 'react'
import Checkbox from '../common/Checkbox'
import { Container } from '../common/Container'
import Range from '../common/Range'
import Select from '../common/Select'

const General = () => {
  const { setTheme } = useTheme()

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
  }

  const handleWindowOpacity = (e: ChangeEvent<HTMLInputElement>) => {
    emit('background_opacity', +e.target.value / 10)
  }

  const handleWindowBorderRadius = (e: ChangeEvent<HTMLInputElement>) => {
    emit('window_border_radius', +e.target.value)
  }

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
          <Checkbox />
        </li>
        <li>
          <p>窗口透明度</p>
          <Range min={0} max={10} onChange={handleWindowOpacity} />
        </li>
        <li>
          <p>窗口大小百分比</p>
          <Range min={0} max={100} />
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
              { key: 'null', description: '空' },
              { key: 'cheatsheet', description: 'CheatSheet窗口' },
              { key: 'config', description: '配置窗口' },
            ]}
          />
        </li>
      </ul>
    </Container>
  )
}

export default General
