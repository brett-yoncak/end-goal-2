<script setup>
import { RouterView } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth'
import router from '@/router'
import { useNotiesStore } from './store/notiesStore';
import { useUserStore } from '@/store/userStore.js'
import AppNotification from '@/components/AppNotification.vue';

const auth = getAuth()
const noti = useNotiesStore()
const userStore = useUserStore()
//Logout button is here for now. Needed for testing.
// Will properly integrate in Options Page PR.
const logout = () => {
  if(userStore.loggedIn) {
    signOut(auth)
      .then(() => {
        userStore.logout()
        router.replace({name: 'login'})
      })
      .catch(() => {
        noti.setNotification({
          type: 'error',
          header: 'Something went wrong.',
          message: 'Oops... please try again.',
        })
      })
  } else {
    noti.setNotification({
      type: 'error',
      header: 'Already logged out.',
      message: 'Login to get started!',
    })
  }
}
</script>

<template>
  <AppNotification />
  <button @click="logout">
    <p>
      LOGOUT
    </p>
  </button>

  <RouterView />
</template>
