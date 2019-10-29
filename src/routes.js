import Basics from '@/components/items/Basics'
import Defense from '@/components/items/Defense'
import Food from '@/components/items/Food'
import Tools from '@/components/items/Tools'
export default [
  { path: '/', redirect: '/basics' },
  { path: '/basics', component: Basics },
  { path: '/defense', component: Defense },
  { path: '/food', component: Food },
  { path: '/tools', component: Tools }
]
