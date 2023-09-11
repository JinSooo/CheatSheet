// 防抖函数
export const debounce = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout | null = null

  return (...args: unknown[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}
