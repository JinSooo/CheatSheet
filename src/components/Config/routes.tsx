import About from './routes/About'
import General from './routes/General'
import Hotkey from './routes/Hotkey'
import SupportApp from './routes/SupportApp'

const routes = [
  {
    id: 'general',
    path: '/config/general',
    name: '通用',
    element: <General />,
  },
  {
    id: 'hotkey',
    path: '/config/hotkey',
    name: '快捷键',
    element: <Hotkey />,
  },
  {
    id: 'supportApp',
    path: '/config/supportApp',
    name: '已适配应用',
    element: <SupportApp />,
  },
  {
    id: 'about',
    path: '/config/about',
    name: '关于应用',
    element: <About />,
  },
]

export default routes
