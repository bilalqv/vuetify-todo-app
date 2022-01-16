import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo2 from '../views/Todo2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todo2',
    component: Todo2
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
