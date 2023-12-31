import { Info, Keyboard, LayoutGrid, Settings2 } from 'lucide-react'
import About from './routes/About/About'
import General from './routes/General'
import Hotkey from './routes/Hotkey'
import SupportApp from './routes/SupportApp'

const routes = [
  {
    id: 'general',
    path: '/config/general',
    name: '通用',
    icon: <Settings2 size={16} />,
  },
  {
    id: 'hotkey',
    path: '/config/hotkey',
    name: '快捷键',
    icon: <Keyboard size={16} />,
  },
  {
    id: 'supportApp',
    path: '/config/supportApp',
    name: '已适配应用',
    icon: <LayoutGrid size={16} />,
  },
  {
    id: 'about',
    path: '/config/about',
    name: '关于应用',
    icon: <Info size={16} />,
  },
]

export default routes
