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
          <div className='w-[100vw]'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
