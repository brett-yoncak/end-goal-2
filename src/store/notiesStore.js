import { defineStore } from 'pinia'

export const useNotiesStore = defineStore('notiesStore', {
  state() {
    return {
      notification: {
        type: '',
        header: '',
        message: '',
      },
      hidden: true
    }
  },

  actions: {
    setNotification(noti) {
      this.notification.type = noti.type
      this.notification.header = noti.header
      this.notification.message = noti.message
      this.hidden = false
    },

    turnOffNotification(){
      this.$reset()
    }
  }
})
