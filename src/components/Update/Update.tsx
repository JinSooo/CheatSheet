'use client'

import MarkDown from 'react-markdown'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { UpdateManifest, checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { WebviewWindow } from '@tauri-apps/api/window'

const Update = () => {
  const window = useRef<WebviewWindow>()
  const [loading, setLoading] = useState(true)
  const [shouldUpdate, setShouldUpdate] = useState(true)
  const [currentVersion, setCurrentVersion] = useState('')
  const [manifest, setManifest] = useState<UpdateManifest>()
  const [total, setTotal] = useState(0)
  const [downloaded, setDownloaded] = useState(0)

  const init = async () => {
    // 获取当前窗口
    const { getCurrent } = await import('@tauri-apps/api/window')
    window.current = getCurrent()

    // 获取当前版本
    const { getVersion } = await import('@tauri-apps/api/app')
    setCurrentVersion(await getVersion())
  }

  const close = async () => {
    await window.current?.close()
  }

  const check = async () => {
    const { shouldUpdate, manifest } = await checkUpdate()
    setShouldUpdate(shouldUpdate)

    if (shouldUpdate) {
      setManifest(manifest)
    }

    setLoading(false)
  }

  useEffect(() => {
    init()
    check()
  }, [])

  return (
    <div className='relative flex w-full h-full pr-2'>
      <div className='w-1/4 mt-6'>
        <Image src='imgs/icon.png' width={72} height={72} alt='icon' className='mx-auto' />
      </div>
      {loading ? (
        <div className='flex-1 flex justify-center'>
          <span className='loading loading-spinner -translate-y-10' />
        </div>
      ) : (
        <div className='flex-1 flex flex-col gap-2 pt-2 pb-12 text-sm'>
          <p className='font-semibold'>新版本的 CheatSheet 已经发布</p>
          <p>
            CheatSheet <span className='font-semibold'>{manifest?.version}</span> 可供下载，您现在的版本是{' '}
            <span className='font-semibold'>{currentVersion}</span>。您现在要下载吗？
          </p>
          <p className='font-semibold'>更新信息: </p>
          <div className='bg-[var(--background-prose)] shadow-inner overflow-auto rounded pl-2 mr-4 mb-8'>
            <div className='prose prose-neutral dark:prose-invert scale-[.85] -translate-x-7 -translate-y-4'>
              <MarkDown>{manifest?.body}</MarkDown>
            </div>
          </div>
        </div>
      )}
      <div className='absolute right-2 bottom-10'>
        <button type='button' className='btn btn-info btn-sm w-24 mr-6'>
          更新
        </button>
        <button type='button' className='btn btn-neutral btn-sm w-24' onClick={close}>
          取消
        </button>
      </div>
    </div>
  )
}

export default Update
