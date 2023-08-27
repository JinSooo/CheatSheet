import { listen } from '@tauri-apps/api/event'

export const initListen = () => {
  listen('init', (data) => console.log(data))
  listen('currentWindow', (data) => console.log(data))
}
