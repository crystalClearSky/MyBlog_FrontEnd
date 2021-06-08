import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Content from '@/views/Content.vue'
import AddCard from '@/views/AddCard.vue'
import LogIn from '@/views/LogIn.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/content',
    name: 'Content',
    component: Content
    //component: () => import(/* webpackChunkName: "about" */ '../views/Content.vue')
  },
  {
    path: '/addcard',
    name: 'AddCard',
    component: AddCard
    //component: () => import(/* webpackChunkName: "about" */ '../views/Content.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
    //component: () => import(/* webpackChunkName: "about" */ '../views/Content.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
