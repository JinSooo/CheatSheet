export const showMainWindow = async () => {
  const { WebviewWindow } = await import('@tauri-apps/api/window')
  WebviewWindow.getByLabel('main')?.show()
}
