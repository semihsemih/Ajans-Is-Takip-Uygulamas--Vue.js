import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Tables from './views/Table/Tables.vue'
import CreateTable from './views/Table/CreateTable.vue'
import Table from './views/Table/Table.vue'
import Signup from './views/User/Signup.vue'
import Signin from './views/User/Signin.vue'
import AuthGuard from './auth-guard'
import RemoveWorkLists from './remove-work-lists'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables,
      beforeEnter: AuthGuard
    },
    {
      path: '/tables/:id',
      name: 'Table',
      props: true,
      component: Table,
      beforeEnter: (to, from, next) => { 
        AuthGuard(to, from, next); 
        RemoveWorkLists(to, from, next);
      }
    },
    {
      path: '/table/new',
      name: 'CreateTable',
      component: CreateTable,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})