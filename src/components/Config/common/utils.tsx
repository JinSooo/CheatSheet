export const convertType = (type: string) => {
  if (type === 'check') {
    return <input type='checkbox' className='toggle toggle-info' />
  } else if (type === 'range') {
    return <input type='range' min={0} max={10} className='range range-xs range-info w-1/3' />
  } else if (type === 'select') {
    return (
      <select className='select select-sm select-info w-1/3'>
        <option>跟随系统</option>
        <option>白天模式</option>
        <option>夜间模式</option>
      </select>
    )
  } else if (type === 'keyboard') {
    return (
      <div className='relative w-1/3'>
        <input
          type='text'
          placeholder='快捷键键位'
          className='input input-sm input-bordered input-info w-full max-w-xs'
        />
        {/* TODO: 按钮点击向下偏移，没找到问题所在，可以当作一种特色（⊙ｏ⊙） */}
        <button className='btn w-8 h-8 min-h-8 btn-ghost absolute top-[50%] translate-y-[-50%] right-0' type='button'>
          √
        </button>
      </div>
    )
  } else {
    return <></>
  }
}
