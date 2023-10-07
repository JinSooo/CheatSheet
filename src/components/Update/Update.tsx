'use client'

import MarkDown from 'react-markdown'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { UpdateManifest, checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { WebviewWindow } from '@tauri-apps/api/window'
import { UnlistenFn, listen } from '@tauri-apps/api/event'

let unlisten: UnlistenFn
let eventId = 0

const Update = () => {
  const window = useRef<WebviewWindow>()
  const [loading, setLoading] = useState(true)
  const [isLatest, setIsLatest] = useState(true)
  const [currentVersion, setCurrentVersion] = useState('')
  const [manifest, setManifest] = useState<UpdateManifest>()
  const [total, setTotal] = useState(0)
  const [downloaded, setDownloaded] = useState(-1)
  const percent = (downloaded / total) * 100

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

  const update = async () => {
    await installUpdate()
  }

  const check = async () => {
    const { shouldUpdate, manifest } = await checkUpdate()
    setIsLatest(!shouldUpdate)

    if (shouldUpdate) {
      setManifest(manifest)

      // 记录当前下载进度
      unlisten = await listen('tauri://update-download-progress', (e) => {
        if (eventId === 0) {
          eventId = e.id
        }
        if (e.id === eventId) {
          // @ts-ignore
          setTotal(e.payload.contentLength)
          setDownloaded((a) => {
            // @ts-ignore
            return a + e.payload.chunkLength
          })
        }
      })
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
        // 加载
        <div className='flex-1 flex justify-center'>
          <span className='loading loading-spinner -translate-y-10' />
        </div>
      ) : isLatest ? (
        // 最新版本
        <div className='flex-1 flex flex-col gap-2 pt-4 pb-12 text-sm'>
          <p className='font-semibold'>当前应用已是最新版本</p>
          <p>
            CheatSheet 最新版本 <span className='font-semibold'>{currentVersion}</span>，您现在的版本是{' '}
            <span className='font-semibold'>{currentVersion}</span>。
          </p>
          {/* 操纵 */}
          <div className={`absolute right-2 bottom-10 ${total !== 0 ? 'hidden' : ''}`}>
            <button type='button' className='btn btn-info btn-sm w-24' onClick={close}>
              确认
            </button>
          </div>
        </div>
      ) : (
        // 更新窗口
        <>
          <div className='flex-1 flex flex-col gap-2 pt-4 pb-12 text-sm'>
            <p className='font-semibold'>新版本的 CheatSheet 已经发布</p>
            <p>
              CheatSheet <span className='font-semibold'>{manifest?.version}</span> 可供下载，您现在的版本是{' '}
              <span className='font-semibold'>{currentVersion}</span>。您现在要下载吗？
            </p>
            <p className='font-semibold'>更新信息: </p>
            <div className='bg-[var(--background-prose)] shadow-inner overflow-auto rounded pl-2 mr-4 mb-8 h-full'>
              <div className='prose prose-neutral dark:prose-invert scale-[.85] -translate-x-7 -translate-y-4'>
                <MarkDown>{manifest?.body}</MarkDown>
              </div>
            </div>
          </div>
          {/* 操纵 */}
          <div className={`absolute right-2 bottom-10 ${total !== 0 ? 'hidden' : ''}`}>
            <button type='button' className='btn btn-info btn-sm w-24 mr-6' onClick={update}>
              更新
            </button>
            <button type='button' className='btn btn-neutral btn-sm w-24' onClick={close}>
              取消
            </button>
          </div>
        </>
      )}
      {/* 进度条 */}
      {total !== 0 && (
        <div className='absolute bottom-11 w-full px-8 flex flex-col justify-center gap-1'>
          <div className='flex justify-between text-sm'>
            {downloaded < total ? (
              <>
                <p>下载进度</p>
                <p>{Math.floor(percent)}%</p>
              </>
            ) : (
              <p>安装中...</p>
            )}
          </div>
          <progress className='progress progress-info' value={percent} max='100' />
        </div>
      )}
    </div>
  )
}

export default Update
