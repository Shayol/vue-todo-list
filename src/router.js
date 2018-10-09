import Vue from 'vue'
import Router from 'vue-router'
import NewList from './components/NewList.vue'
import ListItem from './components/ListItem.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'NewList',
      component: NewList
    },
    {
      path: '/lists/:listId',
      name: 'ListItem',
      component: ListItem
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})