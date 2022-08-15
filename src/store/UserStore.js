import { defineStore } from 'pinia'
import { EventBus } from '@/event-bus'

export const useUserStore = defineStore('userStore', {
  state() {
    return {
      loggedIn: false,
      name: '',
      currentEndGoal: '',
      endGoals: [],
      tasks: [],
      archives: [],
    }
  },

  getters: {},

  actions: {
    login() {
      if(!this.loggedIn){
        EventBus.emit('notify', {
          type: 'success',
          header: 'Welcome',
          message: 'Good luck on your tasks!',
        })
      this.loggedIn = true
      } else alert('You are already logged in.')  
    },

    logout() {
      if(this.loggedIn){
        EventBus.emit('notify', {
          type: 'success',
          header: 'Goodbye!',
          message: 'Have a nice day.',
        })
        this.$reset()
      } else {
        EventBus.emit('notify', {
          type: 'error',
          header: 'You are already logged out.',
          message: 'Login to get started!',
        })
      }  
    },

    setName(name) {
      this.name = name
    }
  },

  persist: true
})
