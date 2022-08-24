<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getAuth } from 'firebase/auth'
import { useNotiesStore } from '@/store/notiesStore.js'
import { useUserStore } from '@/store/userStore.js'
import CleanButton from '@/components/CleanButton.vue'
import TextWrapper from '@/components/TextWrapper.vue'

const auth = getAuth();

const userStore = useUserStore()

let { email } = storeToRefs(userStore)

let password = ref('')

const login = () => {
  userStore.login(auth, password.value)
  
  password.value = ''
}
</script>

<template>
  <div class="card">
    <header class="heading">
      <h1>Log in to start acheiving your goals! 🏆</h1>
    </header>

    <main class="content">
      <form class="form" @submit.prevent="login">  
        <TextWrapper
          v-model="email"
          placeholder="Email"
        />
    
        <TextWrapper 
          v-model="password"
          placeholder="Password"
          type="password"
        />
        
        <CleanButton
          background="green"
          text="Login"
          type="submit" 
        />
      </form>
    </main>

    <div class="bottom-bar">
      <router-link to="/register" class="router">
        <p class="reminder-text">
          Don't have an account? &nbsp;
        </p>

        <p class="normal-text">
          Click here to sign up.
        </p>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reminder-text {
  color: $red;
}

.normal-text {
  color: white;
}
</style>
