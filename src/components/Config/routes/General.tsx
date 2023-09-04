const General = () => {
  return (
    <div className='p-6'>
      <header className='mb-4'>
        <p className='text-2xl text-center font-bold'>通用</p>
      </header>
      <ul className='flex flex-col gap-6'>
        <li className='flex justify-between items-center'>
          <p>开机启动</p>
          <input type='checkbox' className='toggle toggle-info' />
        </li>
        <li className='flex justify-between items-center'>
          <p>启动时检查更新</p>
          <input type='checkbox' className='toggle toggle-info' />
        </li>
        <li className='flex justify-between items-center'>
          <p>窗口置顶</p>
          <input type='checkbox' className='toggle toggle-info' />
        </li>
        <li className='flex justify-between items-center'>
          <p>窗口透明度</p>
          <input type='range' min={0} max={10} className='range range-xs range-info w-1/3' />
        </li>
        <li className='flex justify-between items-center'>
          <p>窗口大小百分比</p>
          <input type='range' min={0} max={100} className='range range-xs range-info w-1/3' />
        </li>
        <li className='flex justify-between items-center'>
          <p>主题</p>
          <select className='select select-sm select-info w-1/3'>
            <option>跟随系统</option>
            <option>白天模式</option>
            <option>夜间模式</option>
          </select>
        </li>
        <li className='flex justify-between items-center'>
          <p>托盘点击事件</p>
          <select className='select select-sm select-info w-1/3'>
            <option>空</option>
            <option>快捷键窗口</option>
            <option>配置窗口</option>
          </select>
        </li>
      </ul>
    </div>
  )
}

export default General
