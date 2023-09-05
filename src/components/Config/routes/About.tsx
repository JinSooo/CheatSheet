const About = () => {
  return (
    <div className='p-6'>
      <header className='mb-4'>
        <p className='text-2xl text-center font-semibold'>关于应用</p>
      </header>
      <div className='flex flex-col gap-6'>
        <div>软件图标...</div>
        <div>一些软件信息...</div>
        <div className='flex gap-4'>
          <button className='btn btn-sm btn-outline btn-info' type='button'>
            检查更新
          </button>
          <button className='btn btn-sm btn-outline btn-info' type='button'>
            前往下载
          </button>
          <button className='btn btn-sm btn-outline btn-info' type='button'>
            复制配置
          </button>
        </div>
        <div>一些软件链接...</div>
        <div>一些软件反馈...</div>
        <div>一些软件社区...</div>
      </div>
    </div>
  )
}

export default About
