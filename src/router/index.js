import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { auth_user } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/nasa_browse',
    name: 'NASA Browse',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NasaBrowse.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nasa_feeds',
    name: 'NASA Feeds',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NasaFeed.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// navigation guard middleware to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth_user.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
