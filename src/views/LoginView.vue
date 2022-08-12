<script setup>
import { ref } from 'vue'
import router from '@/router'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useUserStore } from '@/store/userStore.js'
import { EventBus } from '@/event-bus.js'
import CleanButton from '@/components/CleanButton.vue'
import TextWrapper from '@/components/TextWrapper.vue'

const auth = getAuth();
const userStore = useUserStore()

let email = ref('')
let password = ref('')

let alert = userStore.alert
let alertType = ref('')
let alertHeader = ref('')
let alertMessage = ref('')

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then(() => {
    userStore.login()
    
    if (userStore.endGoals.length > 0) {
      router.replace({name: 'tasks'})
    } else {
      router.replace({name: 'new'})
    }
  })
  .catch((error) => {
    const errorCode = error.code

    if (errorCode === 'auth/invalid-email') {
      EventBus.emit('notify', {
        type: 'error',
        header: 'Invalid Email',
        message: 'Please enter a valid email address.',
      })
      email.value = ''
      password.value = ''
    } else if (errorCode === 'auth/wrong-password') {
      EventBus.emit('notify', {
        type: 'error',
        header: 'Incorrect Password',
        message: 'Please try again.',
      })
      password.value = ''
    } else if (errorCode === 'auth/user-not-found') {
      EventBus.emit('notify', {
        type: 'error',
        header: 'User Not Found',
        message: 'Please enter a valid email address and password, or create a new account.',
      })
      email.value = ''
      password.value = ''
    } else {
      EventBus.emit('notify', {
        type: 'error',
        header: 'Something went VERY wrong.',
        message: 'Please try again.',
      })
      email.value = ''
      password.value = ''
    }
  })
}
</script>

<template>
  <div class="card">
    <header class="heading">
      <span>🏆 Log in to start acheiving your goals! 🏆</span>
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
      <router-link
        to="/register"
        style="text-decoration: none"
      >
        <span class="reminder-text">
          Don't have an account? &nbsp; 
        </span>
         
        <span class="normal-text">
          Click here to sign up.
        </span>
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
