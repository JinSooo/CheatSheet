import { relaunch } from '@tauri-apps/api/process'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import toast from 'react-hot-toast'
import { toastIcon, toastStyle } from './toast'

export const checkAppUpdate = async () => {
  try {
    const { shouldUpdate, manifest } = await checkUpdate()

    if (shouldUpdate) {
      console.log(`Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`)

      await installUpdate()
      await relaunch()
    } else {
      toast('当前应用已经是最新版本!', { icon: toastIcon, style: toastStyle })
    }
  } catch (error) {
    console.error(error)
  }
}
