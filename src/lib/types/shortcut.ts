export interface ShortCut {
  name: string
  list: ShortCutList[]
}

export interface ShortCutList {
  title: string
  shortcuts: ShortCutItem[]
}

export interface ShortCutItem {
  key: string
  command: string
}
