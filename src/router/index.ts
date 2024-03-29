import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Game',
    component: Game,
    children: [
      {
        path: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
