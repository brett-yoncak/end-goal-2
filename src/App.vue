<script setup>
import { RouterView } from 'vue-router';
import { useUserStore } from '@/store/UserStore'
import router from '@/router'

const userStore = useUserStore()

//Logout button is here for now. Needed for testing.
// Will properly integrate in next PR.

const logout = () => {
  if( userStore.isLoggedin === true ){ 
  userStore.loginOrOut()
  console.log(userStore.isLoggedin)
  router.replace('/login')
  }
  else alert('You are already logged out')
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
