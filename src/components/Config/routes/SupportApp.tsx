'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import { Container } from '../common/Container'
import { readShortCutDir } from '@/lib/utils'
import { FileEntry } from '@tauri-apps/api/fs'

interface DirList {
  [key: string]: string[]
}

const a = 'A'.charCodeAt(0)

const SupportApp = () => {
  // 快捷键应用目录
  const [shortcutDir, setShortcutDir] = useState<FileEntry[]>([])
  // 应用分类列表
  const dirList = useMemo(() => {
    const dirList: DirList = {}
    for (let i = 0; i < shortcutDir.length; ++i) {
      // 说明这是个目录
      if (shortcutDir[i].children) continue
      const c = shortcutDir[i].name?.toUpperCase()[0] ?? '~'
      const n = c.charCodeAt(0)
      if (n >= a && n <= a + 26) {
        if (!(c in dirList)) dirList[c] = []
        dirList[c].push(shortcutDir[i].name?.split('.')[0] ?? '')
      } else {
        if (!('Other' in dirList)) dirList.Other = []
        dirList.Other.push(shortcutDir[i].name?.split('.')[0] ?? '')
      }
    }
    return dirList
  }, [shortcutDir])

  const init = async () => {
    setShortcutDir(await readShortCutDir())
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Container>
      <table className='table table-pin-rows'>
        {Object.entries(dirList).map(([key, dirs]) => (
          <Fragment key={key}>
            <thead>
              <tr>
                <th>{key}</th>
              </tr>
            </thead>
            <tbody>
              {dirs.map((dir) => (
                <tr key={dir}>
                  <td>{dir}</td>
                </tr>
              ))}
            </tbody>
          </Fragment>
        ))}
      </table>
    </Container>
  )
}

export default SupportApp
