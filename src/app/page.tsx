'use client'

import { listen } from '@tauri-apps/api/event'
import { appWindow } from '@tauri-apps/api/window'
import { useEffect } from 'react'

export default function Home() {
  const fn = async () => {
    await listen('longPress', (data) => console.log(data))
    await appWindow.listen('longPress', (data) => console.log(data))
  }

  useEffect(() => {
    // initShortCut()
    // invoke<string>('greet', { name: 'JinSo' }).then(console.log)
    fn()
  }, [])

  return (
    <div>
      CheatSheet
      <div className='bg-white w-10 h-10'>123</div>
    </div>
  )
}
