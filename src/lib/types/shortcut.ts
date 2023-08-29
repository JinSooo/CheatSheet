export interface ShortCut {
  name: string
  categories: ShortCutCategory[]
}

export interface ShortCutCategory {
  name: string
  shortcuts: ShortCutItem[]
}

export interface ShortCutItem {
  command: string
  description: string
}
