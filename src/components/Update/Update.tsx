import MarkDown from 'react-markdown'

const Update = () => {
  const changelog = `## 0.0.5 (2023-09-26)

### New feature

- 导入、导出、复制配置
- 添加 Toast 提示
- 优化主题配色
- Config窗口新UI
- About窗口新UI
- Config窗口取消Bar, 无头化


### Bugs fixed

- 取消窗口置顶
- 清除无用 shortcut 配置文件
- 修复 tooltip 显示位置偏移
`

  return (
    <div className='flex flex-col items-center w-full h-full'>
      <div className='prose prose-neutral dark:prose-invert h-4/5 overflow-auto no-scrollbar pb-2 mb-1 text-[var(--foreground)]'>
        <MarkDown>{changelog}</MarkDown>
      </div>
      <div className='w-full flex justify-around px-10'>
        <button type='button' className='btn btn-info w-32 min-h-[32px] h-[32px]'>
          更新
        </button>
        <button type='button' className='btn btn-neutral w-32 min-h-[32px] h-[32px]'>
          取消
        </button>
      </div>
    </div>
  )
}

export default Update
