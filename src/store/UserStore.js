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
    loginOrOut() {
      this.loggedIn = !this.loggedIn
    }
  },

  persist: true
})
