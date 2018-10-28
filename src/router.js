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
      path: '/new_list',
      name: 'NewList',
      component: NewList
    },
    {
      path: '/lists/:listId',
      name: 'ListItem',
      component: ListItem
    }
  ]
})
