import { defineStore } from 'pinia'
import { useNotiesStore } from '@/store/notiesStore.js'

export const useUserStore = defineStore('userStore', {
  state: () => ({   
      loggedIn: false,
      name: '',
      email: '',
      currentEndGoal: '',
      endGoals: [],
      archives: [],
  }),

  actions: {
    login(user) {
      const noti = useNotiesStore()
      if(!this.loggedIn){
        noti.setNotification({
          type: 'success',
          header: 'Welcome',
          message: 'Good luck on your tasks!',
        })
      this.loggedIn = true
      this.name = user.displayName
      this.email = user.email
      } else alert('You are already logged in.')  
    },

    logout() {
      if(this.loggedIn){
        const noti = useNotiesStore()
        noti.setNotification({
          type: 'success',
          header: 'Goodbye!',
          message: 'Have a nice day.',
        })
        this.$reset()
      } else {
        const noti = useNotiesStore()
        noti.setNotification({
          type: 'error',
          header: 'Already logged out.',
          message: 'Login to get started!',
        })
      }  
    },

    setName(name) {
      this.name = name
    },

    setNewEndGoal(endGoal, firstTask) {
      this.currentEndGoal = endGoal
      const goal = {
        title: endGoal,
        tasks: [firstTask],
        user: this.email
      }
      this.endGoals.push(goal)
    }
  },

  persist: true
})
