import { defineStore } from 'pinia'

export const useNotiesStore = defineStore('notiesStore', {
  state() {
    return {
      type: '',
      header: '',
      message: '',
      hidden: true
    }
  },

  actions: {
    setNotification(noti) {
      this.type = noti.type
      this.header = noti.header
      this.message = noti.message
      this.hidden = false
    },

    turnOffNotification(){
      this.$reset()
    }
  }
})
