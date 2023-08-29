interface Props {
  appName: string // App Name
}

const ShortCut = ({ appName }: Props) => {
  const shortcuts = {
    name: 'Windows',
    categories: [
      {
        name: '复制、粘贴及其他常规的键盘快捷方式',
        shortcuts: [
          { command: 'Ctrl+X', description: '剪切选定项' },
          { command: 'Ctrl+C', description: '复制选定项' },
          { command: 'Ctrl+V', description: '粘贴选定项' },
          { command: 'Ctrl+Z', description: '撤消操作' },
          { command: 'Alt+Tab', description: '在打开的应用之间切换' },
          { command: 'Alt+F4', description: '关闭活动项，或者退出活动应用' },
          { command: 'F2', description: '重命名所选项目' },
          {
            command: 'F3',
            description: '在文件资源管理器中搜索文件或文件夹',
          },
          { command: 'F4', description: '在文件资源管理器中显示地址栏列表' },
          { command: 'F5', description: '刷新活动窗口' },
          { command: 'F6', description: '循环浏览窗口中或桌面上的屏幕元素' },
          { command: 'F10', description: '激活活动应用中的菜单栏' },
          { command: 'Alt+F8', description: '在登录屏幕上显示你的密码' },
          { command: 'Alt+Esc', description: '按项目打开顺序循环浏览' },
          {
            command: 'Alt+underlined letter',
            description: '执行该字母相关的命令',
          },
          { command: 'Alt+Enter', description: '显示所选项目的属性' },
          { command: 'Alt+Space', description: '打开活动窗口的快捷菜单' },
          { command: 'Alt+←', description: '返回' },
          { command: 'Alt+→', description: '前进' },
          { command: 'Alt+Page Up', description: '向上移动一个屏幕' },
          { command: 'Alt+Page Down', description: '向下移动一个屏幕' },
          { command: 'Ctrl+F4', description: '关闭活动文档' },
          { command: 'Ctrl+A', description: '选择文档或窗口中的所有项目' },
          { command: 'Ctrl+D', description: '删除选定项，将其移至回收站' },
          { command: 'Ctrl+E', description: '打开搜索' },
          { command: 'Ctrl+R', description: '刷新活动窗口' },
          { command: 'Ctrl+Y', description: '恢复操作' },
          {
            command: 'Ctrl+→',
            description: '将光标移动到下一个字词的起始处',
          },
          {
            command: 'Ctrl+←',
            description: '将光标移动到上一个字词的起始处',
          },
          { command: 'Ctrl+↓', description: '将光标移动到下一段落的起始处' },
          { command: 'Ctrl+↑', description: '将光标移动到上一段落的起始处' },
          {
            command: 'Ctrl+Alt+Tab',
            description: '使用箭头键在所有打开的应用之间进行切换',
          },
          {
            command: 'Alt+Shift+arrow keys',
            description: '当组或磁贴的焦点放在“开始”菜单上时，可将其朝指定方向移动',
          },
          {
            command: 'Ctrl+Shift+arrow keys',
            description: '当磁贴的焦点放在“开始”菜单上时，将其移到另一个磁贴即可创建一个文件夹',
          },
          {
            command: 'Ctrl+arrow keys',
            description: '打开“开始”菜单后调整其大小',
          },
          {
            command: 'Ctrl+arrow key+Space',
            description: '选择窗口中或桌面上的多个单独项目',
          },
          { command: 'Ctrl+Esc', description: '打开“开始”菜单' },
          { command: 'Ctrl+Shift+Esc', description: '打开任务管理器' },
          {
            command: 'Ctrl+Shift',
            description: '如果多种键盘布局可用，则可切换键盘布局',
          },
          {
            command: 'Ctrl+Space',
            description: '打开或关闭中文输入法编辑器',
          },
          { command: 'Shift+F10', description: '显示选定项的快捷菜单' },
          {
            command: 'Shift+arrow key',
            description: '在窗口中或桌面上选择多个项目，或在文档中选择文本',
          },
          {
            command: 'Shift+Delete',
            description: '删除选定项，无需先移动到回收站',
          },
          { command: '→', description: '打开右侧的下一个菜单，或打开子菜单' },
          { command: '←', description: '打开左侧的下一个菜单，或关闭子菜单' },
          { command: 'Esc', description: '停止或离开当前任务' },
          {
            command: 'PrtScn',
            description: '捕获整个屏幕的屏幕截图并将其复制到剪贴板',
          },
        ],
      },
      {
        name: 'Windows徽标键键盘快捷方式',
        shortcuts: [
          { command: 'Windows', description: '打开或关闭“开始”菜单' },
          { command: 'Windows+A', description: '打开快速设置' },
          {
            command: 'Windows+B',
            description: '将焦点设置为任务栏角落的第一个图标',
          },
          {
            command: 'Windows+C',
            description: '从 Microsoft Teams 打开聊天',
          },
          { command: 'Windows+Shift+C', description: '打开超级按钮菜单' },
          { command: 'Windows+Ctrl+C', description: '打开颜色筛选器' },
          { command: 'Windows+D', description: '显示和隐藏桌面' },
          { command: 'Windows+E', description: '打开文件资源管理器' },
          { command: 'Windows+F', description: '打开反馈中心并获取屏幕截图' },
          { command: 'Windows+G', description: '打开 Xbox Game Bar' },
          { command: 'Windows+Alt+B', description: '打开或关闭 HDR' },
          { command: 'Windows+H', description: '启动语音键入' },
          { command: 'Windows+I', description: '打开设置' },
          {
            command: 'Windows+J',
            description: '请将焦点设置到可用的 Windows 提示',
          },
          { command: 'Windows+K', description: '从“快速设置”打开“投放”' },
          { command: 'Windows+L', description: '锁定你的电脑或切换帐户' },
          { command: 'Windows+M', description: '最小化所有窗口' },
          {
            command: 'Windows+Shift+M',
            description: '还原桌面上的最小化窗口',
          },
          { command: 'Windows+N', description: '打开通知中心和日历' },
          { command: 'Windows+O', description: '锁定设备方向' },
          { command: 'Windows+P', description: '选择演示显示模式' },
          { command: 'Windows+Ctrl+Q', description: '打开快速助手' },
          { command: 'Windows+R', description: '打开“运行”对话框' },
          {
            command: 'Windows+Alt+R',
            description: '在焦点中录制游戏窗口的视频',
          },
          { command: 'Windows+S', description: '打开搜素' },
          {
            command: 'Windows+Shift+S',
            description: '获取部分屏幕的屏幕截图',
          },
          { command: 'Windows+T', description: '循环浏览任务栏上的应用' },
          { command: 'Windows+U', description: '打开辅助功能设置' },
          { command: 'Windows+V', description: '打开剪贴板历史记录' },
          { command: 'Windows+Shift+V', description: '将焦点设置到通知' },
          { command: 'Windows+W', description: '打开小组件' },
          { command: 'Windows+X', description: '打开“快速链接”菜单' },
          {
            command: 'Windows+Y',
            description: '在 Windows Mixed Reality 与桌面之间切换输入',
          },
          { command: 'Windows+Z', description: '打开对齐布局' },
          { command: 'Windows+;', description: '打开表情符号面板' },
          { command: 'Windows+,', description: '临时速览桌面' },
          { command: 'Windows+Pause', description: '打开设置 > 系统 > 关于' },
          { command: 'Windows+Ctrl+F', description: '搜索电脑' },
          {
            command: 'Windows+Number',
            description: '打开桌面，然后启动固定到任务栏的应用',
          },
          {
            command: 'Windows+Shift+Number',
            description: '打开桌面，然后启动固定到任务栏的应用新实例',
          },
          {
            command: 'Windows+Alt+Number',
            description: '打开桌面，然后打开固定到任务栏的应用的“跳转列表”',
          },
          { command: 'Windows+Tab', description: '打开任务视图' },
          { command: 'Windows+↑', description: '最大化窗口' },
          {
            command: 'Windows+Alt+↑',
            description: '将焦点中的窗口贴靠到屏幕的上半部分',
          },
          {
            command: 'Windows+↓',
            description: '删除屏幕上的当前应用并最小化桌面窗口',
          },
          {
            command: 'Windows+Alt+↓',
            description: '将焦点窗口贴靠到屏幕下半部分',
          },
          {
            command: 'Windows+←',
            description: '最大化屏幕左侧的应用或桌面窗口',
          },
          {
            command: 'Windows+→',
            description: '最大化屏幕右侧的应用或桌面窗口',
          },
          {
            command: 'Windows+Home',
            description: '最小化活动桌面窗口之外的所有窗口',
          },
          {
            command: 'Windows+Shift+↑',
            description: '将桌面窗口拉伸至屏幕顶部和底部',
          },
          {
            command: 'Windows+Shift+↓',
            description: '在垂直方向上还原/最小化活动桌面窗口，而宽度保持不变',
          },
          {
            command: 'Windows+Shift+←/→',
            description: '将桌面上的应用或窗口从一台显示器移动至另一台显示器',
          },
          {
            command: 'Windows+Shift+Space',
            description: '在语言和键盘布局中向后循环',
          },
          { command: 'Windows+Space', description: '切换输入语言和键盘布局' },
          {
            command: 'Windows+Ctrl+Space',
            description: '对之前选择的输入所做的更改',
          },
          { command: 'Windows+Ctrl+Enter', description: '打开“讲述人”' },
          { command: 'Windows+Plus', description: '打开放大镜并放大' },
          { command: 'Windows+Minus', description: '缩小放大镜' },
          { command: 'Windows+Esc', description: '关闭放大镜' },
          { command: 'Windows+/', description: '开始输入法复原流程' },
          {
            command: 'Windows+Ctrl+Shift+B',
            description: '从空白或黑屏唤醒电脑',
          },
          {
            command: 'Windows+PrtScn',
            description: '将全屏屏幕截图保存到文件',
          },
          {
            command: 'Windows+Alt+PrtScn',
            description: '将焦点中的游戏窗口的屏幕截图保存到文件',
          },
        ],
      },
    ],
  }

  return (
    <>
      {/* 四等分 */}
      <div className='grid grid-cols-3 gap-2'>
        {shortcuts.categories.map((category) => (
          <div key={category.name}>
            <div className='font-bold text-2xl'>{category.name}</div>
            {category.shortcuts.map((shortcut) => (
              <div key={shortcut.command} className='flex gap-2'>
                <div className='w-40 text-right'>{shortcut.command}</div>
                <div>{shortcut.description}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default ShortCut
