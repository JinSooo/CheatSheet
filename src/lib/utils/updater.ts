import { message } from '@tauri-apps/api/dialog'
import { relaunch } from '@tauri-apps/api/process'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'

export const checkAppUpdate = async () => {
  try {
    const { shouldUpdate, manifest } = await checkUpdate()

    if (shouldUpdate) {
      console.log(`Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`)

      await installUpdate()
      await relaunch()
    } else {
      await message('当前应用已经是最新版本!', { type: 'info', title: 'Updater' })
    }
  } catch (error) {
    console.error(error)
  }
}
