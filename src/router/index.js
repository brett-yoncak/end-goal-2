import { createRouter, createWebHistory } from 'vue-router'
import { useNotiesStore } from '@/store/notiesStore'
import { useUserStore } from '@/store/userStore.js'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NewGoalView from '../views/NewGoalView.vue'
import TaskView from '../views/TaskView.vue'
import OptionsView from '../views/OptionsView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/options',
      name: 'options',
      component: OptionsView,
      meta: {
        requiresAuth: true
      }
    },

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
      meta: {
        requiresGuest: true
      }
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
  const noti = useNotiesStore()
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest
  const loggedIn = userStore.loggedIn
  const endGoals = userStore.endGoals

  if (requiresAuth && !loggedIn) {
    next('/login')
  } else if (requiresAuth && loggedIn) {
    next()
  } else if (requiresGuest && loggedIn && endGoals.length > 0) {
    noti.setNotification({
      type: 'error',
      header: 'Ooops!',
      message: 'You are already logged in.',
    })
    next('/tasks')
  } else if (requiresGuest && loggedIn && endGoals.length === 0) {
    noti.setNotification({
      type: 'error',
      header: 'Ooops!',
      message: 'You are already logged in.',
    })
    next('/new')
  } else next()
});

export default router;
