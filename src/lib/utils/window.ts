export const showMainWindow = async () => {
  const { WebviewWindow } = await import('@tauri-apps/api/window')
  const mainWindow = WebviewWindow.getByLabel('main')!
  mainWindow.show()
  mainWindow.setFocus()
}
