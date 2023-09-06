import { listen } from '@tauri-apps/api/event'
import { useTheme as useNextTheme } from 'next-themes'
import { useEffect } from 'react'

const useTheme = () => {
  const nextTheme = useNextTheme()

  const initThemeListener = async () => {
    // 监听主题变化
    await listen('theme', (event) => {
      const theme = (event.payload as string).split('_')[1]
      console.log('🎉🎉🎉', 'theme', theme)
      nextTheme.setTheme(theme)
    })
  }

  useEffect(() => {
    initThemeListener()
  }, [])

  return { setTheme: nextTheme.setTheme }
}

export default useTheme
