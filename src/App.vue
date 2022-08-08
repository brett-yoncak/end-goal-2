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
  signOut(auth)
   
  .then(() => {
    userStore.logout()
    router.replace({name: 'login'})
  })
  .catch((error) => {
    console.log(error)
  })
}
</script>

<template>
  <button @click="logout()">
    LOGOUT
  </button>

  <RouterView />
</template>

<style>
html {
  height: 100%;
  padding: 0px;
  margin: 0px;
  overflow: scroll;
}

body {
  height: 100%;
  padding: 0px;
  margin: 0px;
  background-color: #1F1F1F;
  overflow: scroll;
}

#app{
  height: 100%;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
