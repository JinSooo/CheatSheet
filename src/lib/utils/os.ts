// 获取操作系统类型
export const getOSType = async () => {
  const { type } = await import('@tauri-apps/api/os')
  return await type()
}
