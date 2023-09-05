const Hotkey = () => {
  return (
    <div className='p-6'>
      <header className='mb-4'>
        <p className='text-2xl text-center font-semibold'>快捷键</p>
      </header>
      <ul className='flex flex-col gap-6'>
        <li className='flex justify-between items-center'>
          <p>显示CheatSheet</p>
          <div className='relative w-1/3'>
            <input
              type='text'
              placeholder='快捷键键位'
              className='input input-sm input-bordered input-info w-full max-w-xs'
            />
            {/* TODO: 按钮点击向下偏移，没找到问题所在，可以当作一种特色（⊙ｏ⊙） */}
            <button
              className='btn w-8 h-8 min-h-8 btn-ghost absolute top-[50%] translate-y-[-50%] right-0'
              type='button'
            >
              √
            </button>
          </div>
        </li>
        <li className='flex justify-between items-center'>
          <p>当前应用</p>
          <div className='relative w-1/3'>
            <input
              type='text'
              placeholder='快捷键键位'
              className='input input-sm input-bordered input-info w-full max-w-xs'
            />
            <button
              className='btn w-8 h-8 min-h-8 btn-ghost absolute top-[50%] translate-y-[-50%] right-0'
              style={{ width: '2rem !important', height: '2rem !important' }}
              type='button'
            >
              √
            </button>
          </div>
        </li>
        <li className='flex justify-between items-center'>
          <p>禁用CheatSheet快捷键</p>
          <input type='checkbox' className='toggle toggle-info' />
        </li>
        <li className='flex justify-between items-center'>
          <p>禁用当前应用快捷键</p>
          <input type='checkbox' className='toggle toggle-info' />
        </li>
      </ul>
    </div>
  )
}

export default Hotkey
