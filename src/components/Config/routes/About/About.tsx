'use client'

import { open as openBrowser } from '@tauri-apps/api/shell'
import { Container } from '../../common/Container'
import AboutInfo from './about.json'
import Image from 'next/image'
import { checkAppUpdate } from '@/lib/utils/updater'
import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import { save, open } from '@tauri-apps/api/dialog'
import { desktopDir } from '@tauri-apps/api/path'
import { relaunch } from '@tauri-apps/api/process'
import { toast } from 'react-hot-toast'

const About = () => {
  const toBrowser = async (url: string) => {
    await openBrowser(url)
  }

  const checkUpdate = async () => {
    await checkAppUpdate()
  }

  const exportConfig = async () => {
    // 读取配置文件
    const content = await readTextFile('config.json', { dir: BaseDirectory.AppConfig })
    // 获取保存路径
    const filePath = await save({
      defaultPath: await desktopDir(),
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
    toast('配置文件导出成功', { icon: '🎉' })
  }

  const importConfig = async () => {
    // 获取文件路径
    const filePath = (await open({
      defaultPath: await desktopDir(),
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
    toast.loading('配置文件导入成功, 准备重新启动')
    // 重新运行程序加载配置
    setTimeout(async () => {
      await relaunch()
    }, 1000)
  }

  return (
    <Container title='关于应用'>
      <div className='flex flex-col gap-6'>
        <div className='mx-auto'>
          <Image src='/imgs/icon.png' alt='icon' width='64' height='64' />
        </div>
        {AboutInfo.map((item) => (
          <div key={item.title}>
            <p className='text-lg font-semibold mb-2'>{item.title}</p>
            <ul className='list-disc flex flex-col gap-2'>
              {item.list.map((info) => (
                <li className='ml-6' key={info.key}>
                  <span className='mr-2'>{`${info.key}: `}</span>
                  <span
                    className={info.url ? 'link link-info' : ''}
                    onClick={() => (info.url ? toBrowser(info.url) : {})}
                  >
                    {info.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className='flex gap-4'>
          <button className='btn btn-sm btn-outline btn-info' type='button' onClick={checkUpdate}>
            检查更新
          </button>
          <button className='btn btn-sm btn-outline btn-info' type='button'>
            前往下载
          </button>
          <button className='btn btn-sm btn-outline btn-info' type='button' onClick={exportConfig}>
            导出配置
          </button>
          <button className='btn btn-sm btn-outline btn-info' type='button' onClick={importConfig}>
            导入配置
          </button>
        </div>
      </div>
    </Container>
  )
}

export default About
