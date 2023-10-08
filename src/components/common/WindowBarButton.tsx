'use client'

import { WebviewWindow } from '@tauri-apps/api/window'
import { Maximize, Minimize, Minus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const WindowBarButton = () => {
  const window = useRef<WebviewWindow>()
  const [isMaximized, setIsMaximized] = useState(false)

  const init = async () => {
    const { getCurrent } = await import('@tauri-apps/api/window')
    window.current = getCurrent()
  }

  const minimize = () => {
    window.current?.minimize()
  }

  const maximize = () => {
    if (isMaximized) {
      window.current?.unmaximize()
    } else {
      window.current?.maximize()
    }

    setIsMaximized(!isMaximized)
  }

  const close = () => {
    window.current?.close()
  }

  useEffect(() => {
    init()
  })

  return (
    <div className='z-[999]'>
      <button className='btn btn-ghost btn-sm normal-case1 p-1' type='button' onClick={minimize}>
        <Minus />
      </button>
      <button className='btn btn-ghost btn-sm normal-case1 p-1' type='button' onClick={maximize}>
        <div className='w-[24px] h-[24px] flex justify-center items-center scale-90'>
          {isMaximized ? <Minimize /> : <Maximize />}
        </div>
      </button>
      <button className='btn btn-ghost btn-sm normal-case1 p-1' type='button' onClick={close}>
        <X />
      </button>
    </div>
  )
}

export default WindowBarButton
