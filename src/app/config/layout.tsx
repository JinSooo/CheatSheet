'use client'

import ConfigAside from '@/components/Config/ConfigAside'
import Header from '@/components/Config/Header'
import useTheme from '@/lib/hooks/useTheme'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // 内部自处理主题
  const _ = useTheme()

  return (
    <div className='h-screen w-screen text-[var(--foreground)] bg-[var(--background-fore)] overflow-hidden flex rounded-xl p-4 pt-3 pl-2'>
      <ConfigAside />
      <div className='flex-1 flex flex-col'>
        <Header />
        <div className='flex-1 bg-[var(--background)] rounded-box ml-1 overflow-scroll no-scrollbar'>{children}</div>
      </div>
    </div>
  )
}
