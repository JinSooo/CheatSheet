export interface ShortCut {
  name: string
  categories: ShortCutCategory[]
}

export interface ShortCutCategory {
  name: string
  shortcuts: ShortCutItem[]
}

export interface ShortCutItem {
  command: ShortCutCommand
  description: string
}

export interface ShortCutCommand {
  win: string
  mac: string
  linux: string
}

export interface ShortCutKind {
  type: 'combination' | 'multi' | 'normal'
  arr: (JSX.Element | string)[][]
}
