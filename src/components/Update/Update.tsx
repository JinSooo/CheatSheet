import MarkDown from 'react-markdown'
import Image from 'next/image'

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
    <div className='relative flex w-full h-full'>
      <div className='w-1/3 mt-6'>
        <Image src='imgs/icon.png' width={100} height={100} alt='icon' className='mx-auto' />
      </div>
      <div className='flex-1 flex flex-col gap-2 pt-2'>
        <p>
          当前版本: <span className='ml-1'>0.0.1</span>
        </p>
        <p>
          最新版本: <span className='ml-1'>0.0.1</span>
        </p>
        <p>版本日志: </p>
        <div className='prose prose-neutral dark:prose-invert h-3/5 overflow-auto scale-[.85] -translate-x-6 -translate-y-4'>
          <MarkDown>{changelog}</MarkDown>
        </div>
      </div>
      <div className='absolute right-2 bottom-10'>
        <button type='button' className='btn btn-info btn-sm w-24 mr-6'>
          更新
        </button>
        <button type='button' className='btn btn-neutral btn-sm w-24'>
          取消
        </button>
      </div>
    </div>
  )
}

export default Update
