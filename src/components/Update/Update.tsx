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
    <div className='relative flex w-full h-full pr-2'>
      <div className='w-1/4 mt-6'>
        <Image src='imgs/icon.png' width={72} height={72} alt='icon' className='mx-auto' />
      </div>
      <div className='flex-1 flex flex-col gap-2 pt-2 pb-12 text-sm'>
        <p className='font-semibold'>新版本的 CheatSheet 已经发布</p>
        <p>CheatSheet 0.0.5 可供下载，您现在的版本是 0.0.5。您现在要下载吗？</p>
        <p className='font-semibold'>更新信息: </p>
        <div className='bg-[var(--background-prose)] shadow-inner overflow-auto rounded pl-2 mr-4 mb-8'>
          <div className='prose prose-neutral dark:prose-invert scale-[.85] -translate-x-7 -translate-y-4'>
            <MarkDown>{changelog}</MarkDown>
          </div>
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
