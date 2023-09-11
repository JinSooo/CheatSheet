'use client'

import ConfigAside from '@/components/Config/ConfigAside'
import useTheme from '@/lib/hooks/useTheme'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // 内部自处理主题
  const _ = useTheme()

  return (
    <div className='h-screen w-screen text-[var(--foreground)] bg-[var(--background-config-menu)] overflow-hidden flex'>
      <ConfigAside />
      <div className='flex-1 bg-[var(--background)] rounded-box my-4 mr-4 overflow-scroll no-scrollbar'>{children}</div>
    </div>
  )
}
