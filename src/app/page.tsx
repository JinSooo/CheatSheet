'use client'

import { listen } from '@tauri-apps/api/event'
import { useEffect, useState } from 'react'

export default function Home() {
  const [activeAppName, setActiveAppName] = useState('')

  const initListen = async () => {
    await listen('active-window', (event) => {
      console.log('payload', event.payload)
      setActiveAppName(event.payload as string)
    })
  }

  useEffect(() => {
    initListen()
  }, [])

  return (
    <div>
      CheatSheet
      <h1 className='text-2xl'>{activeAppName}</h1>
    </div>
  )
}
