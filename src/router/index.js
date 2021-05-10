import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/components/layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/userprofile',
        name: 'userprofile',
        component: () => import('@/views/users')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
