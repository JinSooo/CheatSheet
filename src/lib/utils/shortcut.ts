import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs'
import { ShortCut } from '../types'

export const readShortCut = async (name: string): Promise<ShortCut> => {
  const content = await readTextFile(`resources/shortcuts/${name}.json`, {
    dir: BaseDirectory.Resource,
  })
  const shortcut = JSON.parse(content)
  return shortcut
}
