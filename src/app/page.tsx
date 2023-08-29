'use client'

import ShortCut from '@/components/ShortCut/ShortCut'
import { readShortCut } from '@/lib/utils'
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

  const read = async () => {
    const shortcut = await readShortCut('shortcut.template')
    console.log(shortcut)
  }

  useEffect(() => {
    initListen()
  }, [])

  return <ShortCut appName={activeAppName} />
}
