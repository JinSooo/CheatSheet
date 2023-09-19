'use client'

import { open } from '@tauri-apps/api/shell'
import { Container } from '../../common/Container'
import AboutInfo from './about.json'
import Image from 'next/image'
import { emit } from '@tauri-apps/api/event'
import { checkAppUpdate } from '@/lib/utils/updater'

const About = () => {
  const toBrowser = async (url: string) => {
    await open(url)
  }

  const checkUpdate = async () => {
    await checkAppUpdate()
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
          {/* <button className='btn btn-sm btn-outline btn-info' type='button'>
            复制配置
          </button> */}
        </div>
      </div>
    </Container>
  )
}

export default About
