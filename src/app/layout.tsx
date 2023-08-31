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
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem themes={['light', 'dark']}>
          <div
            className='w-screen rounded-2xl text-[var(--foreground)] bg-[var(--background)]'
            // style={{ background: 'rgba(0, 0, 0, 0.7)', boxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.2)' }}
          >
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
