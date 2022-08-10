<script setup>
import { RouterView } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth'
import { useUserStore } from '@/store/UserStore'
import router from '@/router'

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
    .catch((error) => {
      alert('something went wrong')
    })
  } else {
    alert('You are already logged out.')
  }
}
</script>

<template>
  <button @click="logout">
    LOGOUT
  </button>

  <RouterView />
</template>
