# 快捷键相关信息及规范

## 规范

### 按键书写

> 按键的首字母请求使用大小 `Ctrl`...

### 特殊键位

#### 系统相关

Windows

- `Ctrl`
- `Shift`
- `Win`
- `Alt`

Mac

- `Control`
- `Shift`
- `Command / Cmd`
- `Option`

Linux

- `Ctrl`
- `Shift`
- `Win`
- `Alt`

#### 特殊按键字符

- `PageUp` -> `PgUp`
- `PageDown` -> `PgDn`
- `CapsLock` -> `Caps`
- `ScrollLock` -> `Scroll`
- `NumLock` -> `Num`
- `Print Screen` -> `PrtSc`
- `退格键` -> `BackSpace`
- `空格键` -> `Space`
- `ArrowLeft` -> `←`
- `ArrowRight` -> `→`
- `ArrowTop` -> `↑`
- `ArrowBottom` -> `↓`

### 转义字符

对于一些特殊的字符，在json文件中需要进行转义，通过字符`\`来转义它

`"Ctrl+\\"` -> `Ctrl+\`

### 快捷键

#### 普通快捷键

用 `+` 符号连接, 中间不需要用空格隔开

- `Ctrl+Shift+A`
- `Ctrl+Shift+A`
- `Command+Shift+A`

#### 组合快捷键

用 `&` 符号连接, 中间用空格隔开
即`Ctrl+K`再按下`Ctrl+U`都能触发该功能

- `Ctrl+K & Ctrl+U`

#### 功能含有多种快捷键

用 `|` 符号连接, 中间用空格隔开
即`Ctrl+K`和`Ctrl+U`都能触发该功能

- `Ctrl+K | Ctrl+U`

## 页面最终呈现

### Windows

- `Win` -> Win图标

### Mac

- `Control` -> `⌃`
- `Command` -> `⌘`
- `Cmd` -> `⌘`
- `Alt` -> `⌥`
- `Shift` -> `⇧`