import { create } from 'zustand'

interface State {
  backgroundOpacity: number // 背景透明度
  windowBorderRadius: number // 窗口圆角
}

interface Action {
  setBackgroundOpacity: (backgroundOpacity: State['backgroundOpacity']) => void
  setWindowBorderRadius: (windowBorderRadius: State['windowBorderRadius']) => void
}

const useWindowStore = create<State & Action>((set) => ({
  backgroundOpacity: 1, // 0 - 1
  windowBorderRadius: 16, // 16px -> 1rem
  setBackgroundOpacity: (backgroundOpacity) =>
    set(() => ({
      backgroundOpacity: backgroundOpacity / 10,
    })),
  setWindowBorderRadius: (windowBorderRadius) =>
    set(() => ({
      windowBorderRadius,
    })),
}))

export default useWindowStore
