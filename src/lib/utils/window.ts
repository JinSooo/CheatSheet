export const showMainWindow = async () => {
  const { WebviewWindow } = await import('@tauri-apps/api/window')
  const mainWindow = WebviewWindow.getByLabel('main')
  if (!mainWindow) return
  mainWindow.show()
  mainWindow.setFocus()
}

export const openUpdateWindow = async () => {
  const { invoke } = await import('@tauri-apps/api')
  invoke('update_window')
}
