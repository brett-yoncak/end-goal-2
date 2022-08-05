import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/UserStore.js'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NewGoalView from '../views/NewGoalView.vue'
import TaskView from '../views/TaskView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskView,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { 
        requiresGuest: true
      }
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },

    {
      path: '/new',
      name: 'new',
      component: NewGoalView,
      meta: {
        requiresAuth: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
  const requiresGuest = to.matched.some((x) => x.meta.requiresGuest)
  const isLoggedin = userStore.isLoggedin
  const numberOfEndGoals = userStore.numberOfEndGoals

  if (requiresAuth && isLoggedin === false) {
    next('/login')
  } else if (requiresAuth && isLoggedin === true) {
    next()
  } else if (requiresGuest && isLoggedin === true && numberOfEndGoals > 0) {
    alert('You are already logged in.')
    next('/tasks')
  } else if (requiresGuest && isLoggedin === true && numberOfEndGoals === 0) {
    alert('You are already logged in.')
    next('/new')
  } else next()
});

export default router;
