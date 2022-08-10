<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useUserStore } from '@/store/UserStore.js'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import CleanButton from '@/components/CleanButton.vue'
import TextWrapper from '@/components/TextWrapper.vue'

const auth = getAuth();
const userStore = useUserStore()

let email = ref('')
let password = ref('')

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
    userStore.login()
    if (userStore.endGoals.length > 0) {
      router.replace({name: 'tasks'})
    } else router.replace({name: 'new'})
  })
  .catch((error) => {
    const errorCode = error.code
    if (errorCode === 'auth/invalid-email') {
      alert('Please enter a valid email address.')
      email.value = ''
      password.value = ''
    }

    else if (errorCode === 'auth/wrong-password') {
      alert('Incorrect password. Please try again.')
      password.value = ''
    }

    else if (errorCode === 'auth/user-not-found') {
      alert('User not found. Enter a valid email and passowrd, or create an new account')
      email.value = ''
      password.value = ''
    }

    else {
      console.log(error)
      email.value = ''
      password.value = ''
    }
  })
}
</script>

<template>
  <div class="grid">
    <header class="heading">
      <span>🏆 Log in to start acheiving your goals! 🏆</span>
    </header>

    <main class="content">
      <form
        class="form"
        @submit.prevent="login"
      >  
        <TextWrapper
          v-model="email"
          placeholder="Email"
        />
    
        <TextWrapper 
          v-model="password"
          type="password"
          placeholder="Password"
        />
        
        <CleanButton
          type="submit" 
          text="Login"
          background="green"
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
.grid {
   @include grid;
}

.heading {
   @include heading
}

.content {
   grid-area: content;
   width: 100%;
}

.form {
   display: flex;
   flex-direction: column;
   row-gap: 8px;
   width: 100%;
}

.text-container {
   @include text-input-container;
}

.bottom-bar {
   display: flex;
   grid-area: foot;
   margin-top: auto;
   padding-bottom: 20px;
   font-size: $f2
}

.reminder-text {
   color: $red;
}

.normal-text {
   color: white;
}
</style>
