import Vue from 'vue'
import VueRouter from 'vue-router'
// import LoginIndex from '@/views/login/LoginIndex'
// import LayoutIndex from '@/views/login/LayoutIndex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // component: LoginIndex,
    component: () => import('@/views/login') // 按需引入
  },
  {
    path: '/',
    name: 'layout',
    // component: LayoutIndex,
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
