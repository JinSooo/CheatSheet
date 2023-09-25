export interface Config {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any
}

export interface ConfigCategory {
  name: string
  component: JSX.Element
}
