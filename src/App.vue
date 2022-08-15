<script setup>
import { RouterView } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth'
import router from '@/router'
import { useUserStore } from '@/store/userStore.js'
import { EventBus } from './event-bus';
import AppNotification from '@/components/AppNotification.vue';

const auth = getAuth()
const userStore = useUserStore()
//Logout button is here for now. Needed for testing.
// Will properly integrate in Options Page PR.
const logout = () => {
  if(userStore.loggedIn) {
    signOut(auth).then(() => {
      userStore.logout()
      router.replace({name: 'login'})
    })
    .catch(() => {
      EventBus.emit('notify', {
        type: 'error',
        header: 'Something went wrong.',
        message: 'Oops... please try again.',
      })
    })
  } else {
    EventBus.emit('notify', {
      type: 'error',
      header: 'You are already logged out.',
      message: 'Login to get started!',
    })
  }
}
</script>

<template>
  <AppNotification class="noti" />
  <button @click="logout">
    <p>
      LOGOUT
    </p>
  </button>

  <RouterView />
</template>

<style scoped>
.noti {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  z-index: 100;
}
</style>
