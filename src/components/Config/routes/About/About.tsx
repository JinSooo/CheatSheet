'use client'

import { open } from '@tauri-apps/api/shell'
import { Container } from '../../common/Container'
import AboutInfo from './about.json'
import Image from 'next/image'
import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import { save, open as openFile } from '@tauri-apps/api/dialog'
import { relaunch } from '@tauri-apps/api/process'
import { toast } from 'react-hot-toast'
import { toastIcon, toastStyle } from '@/lib/utils/toast'
import { writeText } from '@tauri-apps/api/clipboard'
import { openUpdateWindow } from '@/lib/utils/window'
import { useEffect, useState } from 'react'

const About = () => {
  const [version, setVersion] = useState('0.0.0')

  const init = async () => {
    const { getVersion } = await import('@tauri-apps/api/app')
    setVersion(await getVersion())
  }

  const toBrowser = async (url: string) => {
    await open(url)
  }

  const checkUpdate = async () => {
    openUpdateWindow()
  }

  const copyConfig = async () => {
    // 读取配置文件
    const content = await readTextFile('config.json', { dir: BaseDirectory.AppConfig })
    // 写入剪切板
    await writeText(content)
    toast('复制配置信息成功!', { icon: toastIcon, style: toastStyle })
  }

  const exportConfig = async () => {
    // 读取配置文件
    const content = await readTextFile('config.json', { dir: BaseDirectory.AppConfig })
    // 获取保存路径
    const filePath = await save({
      filters: [
        {
          name: 'JSON',
          extensions: ['json'],
        },
      ],
    })
    if (!filePath) return
    // 保存文件
    await writeTextFile(filePath, content)
    toast('配置文件导出成功', { icon: toastIcon, style: toastStyle })
  }

  const importConfig = async () => {
    // 获取文件路径
    const filePath = (await openFile({
      filters: [
        {
          name: 'JSON',
          extensions: ['json'],
        },
      ],
    })) as string
    if (!filePath) return
    // 读取配置文件
    const content = await readTextFile(filePath)
    console.log(content)
    // 写入配置
    await writeTextFile('config.json', content, { dir: BaseDirectory.AppConfig })
    toast.loading('配置文件导入成功, 准备重新启动', { style: toastStyle })
    // 重新运行程序加载配置
    setTimeout(async () => {
      await relaunch()
    }, 1000)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Container>
      <div className='flex flex-col gap-6'>
        <div className='mx-auto'>
          <Image src='/imgs/icon.png' alt='icon' width='64' height='64' />
        </div>
        <div className='flex gap-4 mx-auto'>
          <button className='btn btn-sm btn-outline btn-info' type='button' onClick={checkUpdate}>
            检查更新
          </button>
          <button
            className='btn btn-sm btn-outline btn-info'
            type='button'
            onClick={() => toBrowser('https://github.com/JinSooo/CheatSheet/releases')}
          >
            前往下载
          </button>
          <button className='btn btn-sm btn-outline btn-info' type='button' onClick={copyConfig}>
            复制配置
          </button>
          <button className='btn btn-sm btn-outline btn-info' type='button' onClick={exportConfig}>
            导出配置
          </button>
          <button className='btn btn-sm btn-outline btn-info' type='button' onClick={importConfig}>
            导入配置
          </button>
        </div>
        {AboutInfo.map((item) => (
          <div className='text-sm' key={item.title}>
            <p className='font-semibold mb-2 ml-4'>{item.title}</p>
            <ul className='flex flex-col gap-2 bg-[var(--background-config-category)] rounded-xl p-4'>
              {item.list.map((info, i) => (
                <li key={info.key}>
                  <span className='mr-2'>{`${info.key}: `}</span>
                  <span
                    className={info.url ? 'link link-info' : ''}
                    onClick={() => (info.url ? toBrowser(info.url) : {})}
                  >
                    {info.key === '版本' ? version : info.value}
                  </span>
                  {i !== item.list.length - 1 && <div className='divider h-0 my-2' />}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default About
