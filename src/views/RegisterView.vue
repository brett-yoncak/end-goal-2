<script setup>
import { ref } from 'vue'
import router from '@/router'
import { EventBus } from '@/event-bus.js'
import { getAuth, updateProfile, createUserWithEmailAndPassword } from 'firebase/auth'
import { useUserStore } from '@/store/userStore.js'
import CleanButton from '@/components/CleanButton.vue'
import TextWrapper from '@/components/TextWrapper.vue'


const auth = getAuth();
const userStore = useUserStore()
const user = auth.currentUser

let name = ref('')
let email = ref('')
let password = ref('')
let passwordCheck = ref('')

const register = () => {
  if (password.value != passwordCheck.value){
    EventBus.emit('notify', {
      type: 'error',
      header: 'Passwords Must Match',
      message: 'Passwords did not match. Please try again.',
    })
    password.value = '' 
    passwordCheck.value  = ''
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(() => {
    userStore.login()
    userStore.setName(name.value)
    
    updateProfile(user, {
      displayName:name.value
    })

    router.replace({name: 'new'})
    console.log(user.displayName)  
   })
  .catch((error) => {
    const errorCode = error.code
    
    if (errorCode === 'auth/invalid-email'){
      EventBus.emit('notify', {
        type: 'error',
        header: 'Invalid Email',
        message: 'Please enter a valid email address.',
      })
    } else if (errorCode === 'auth/weak-password'){
      EventBus.emit('notify', {
        type: 'error',
        header: 'Weak Password',
        message: 'Your password should be at least 6 characters long.',
      })
    }
    
    email.value = ''
    password.value = ''
    passwordCheck.value = ''
  })
}
</script>

<template>
  <div class="grid">
    <header class="heading">
      <span>Create your account to get started! 💪</span>
    </header>

    <article class="content">
      <form class="form" @submit.prevent="register">
        <TextWrapper
          v-model="name"
          placeholder="First Name"
        />
      
        <TextWrapper
          v-model="email"
          placeholder="Email"
        />
    
        <TextWrapper 
          v-model="password"
          placeholder="Password"
          type="password"
        />

        <TextWrapper 
          v-model="passwordCheck"
          placeholder="Confirm Password"
          type="password"
        />
    
        <CleanButton
          background="green"
          text="Let's go!"
          type="submit" 
        />
      </form>
    </article>

    <div class="bottom-bar">
      <router-link class="router" to="/login">
        <span class="reminder-text">
          Already have an account? &nbsp; 
        </span>
         
        <span class="normal-text">
          Click here to login.
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
  @include heading;
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
  font-size: $f2;
}

.reminder-text {
  color: $red;
}

.normal-text {
  color: white;
}

.router {
  text-decoration: none
}
</style>
