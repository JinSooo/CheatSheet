'use client'

import { initShortCut } from '@/lib/utils/shortcut'
import { invoke } from '@tauri-apps/api'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    initShortCut()

    invoke<string>('greet', { name: 'JinSo' }).then(console.log)
  }, [])

  return (
    <div>
      CheatSheet
      <div className='bg-white w-10 h-10'>123</div>
    </div>
  )
}
