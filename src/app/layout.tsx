import { ThemeProvider } from '@/components/common/ThemeProvider'
import '@/lib/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CheatSheet',
  description: 'CheatSheet',
  icons: {
    shortcut: ['#'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='h-screen w-screen rounded-2xl text-[var(--foreground)] bg-[var(--background)] overflow-auto no-scrollbar'>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
