'use client'

import { initListen } from '@/lib/utils/listen'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    initListen()
  }, [])

  return <div>CheatSheet</div>
}
