import { defineStore } from 'pinia'

const defaultState = {
  loggedIn: false,
  name: '',
  currentEndGoal: '',
  endGoals: [],
  tasks: [],
  archives: []
}

export const useUserStore = defineStore('UserStore', {
  state() {
    return {
      loggedIn: false,
      name: '',
      currentEndGoal: '',
      endGoals: [],
      tasks: [],
      archives: []
    }
  },

  getters: {},

  actions: {
    login(userId) {
      if(!this.loggedIn){
      alert('Welcome!')
      this.loggedIn = true
      } else alert('You are already logged in.')  
    },

    logout() {
      if(this.loggedIn){
        alert('Goodbye!')
        this.reset()
      } else alert('You are already logged out.')  
    },

    reset() {
      Object.assign(this, defaultState)
    },

    setName(name) {
      this.name = name
    }
  },

  persist: true
})
