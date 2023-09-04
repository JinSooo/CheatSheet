import { useTheme as useNextTheme } from 'next-themes'
import { useCallback, useEffect, useMemo } from 'react'

const useTheme = () => {
  const nextTheme = useNextTheme()

  const setTheme = useCallback(
    (theme: string) => {
      if (nextTheme.theme !== theme) {
        nextTheme.setTheme(theme)
        document.documentElement.setAttribute('data-theme', theme)
      }
    },
    [nextTheme],
  )

  // 监听如果是系统默认主题，则重新设置data-theme
  useEffect(() => {
    console.log(nextTheme.theme, nextTheme.theme, nextTheme.theme)
    if (nextTheme.theme === 'system') {
      document.documentElement.setAttribute(
        'data-theme',
        (nextTheme.theme ?? 'system') === 'system' ? nextTheme.systemTheme ?? '' : nextTheme.theme ?? '',
      )
    }
  }, [nextTheme])

  useEffect(() => {
    // 初始化一下，避免主题不匹配
    setTheme('system')
  })

  return { setTheme }
}

export default useTheme
