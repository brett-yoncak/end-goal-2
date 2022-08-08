import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
  state() {
    return {
      loggedIn: false,
      id: '',
      currentEndGoal: '',
      endGoals: [],
      tasks: [],
      archives: []
    }
  },

  getters: {
    isLoggedin() {
      return this.loggedIn
    },

    numberOfEndGoals() {
      return this.endGoals.length
    }
  },

  actions: {
    login() {
      if(this.loggedIn === false){
      alert('Welcome!')
      this.loggedIn = true
      } else alert('You are already logged in.')  
    },

    logout() {
      if(this.loggedIn === true){
        alert('Goodbye!')
        this.loggedIn = false
      } else alert('You are already logged out.')  
    }
  },

  persist: true
})
