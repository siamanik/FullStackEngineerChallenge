
import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/router/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/',
      alias: '/login',
      component: () => import('@/pages/Login')
    },
    {
      name: 'layout',
      path: '/home',
      redirect: 'feedback',
      beforeEnter: (to, from, next) => Auth.authorized(to, from, next),
      component: () => import('@/pages/Layout'),
      children: [
        {
          name: 'employee',
          path: '/employee',
          beforeEnter: (to, from, next) => Auth.isAdmin(to, from, next),
          component: () => import('@/pages/Employee')
        },
        {
          name: 'review',
          path: '/review',
          beforeEnter: (to, from, next) => Auth.isAdmin(to, from, next),
          component: () => import('@/pages/Review')
        },
        {
          name: 'feedback',
          path: '/feedback',
          component: () => import('@/pages/Feedback')
        }
      ]
    }
  ]
})
