<script setup>
import { ref, inject } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { getAuth, updateProfile, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useUserStore } from '@/store/userStore.js'
import { useNotiesStore } from '@/store/notiesStore.js'
import CleanButton from '@/components/CleanButton.vue'
import TextWrapper from '@/components/TextWrapper.vue'

const db = inject('db')
const auth = getAuth()
const userStore = useUserStore()
const noti = useNotiesStore()

let { name, email } = storeToRefs(userStore)
let password = ref('')
let passwordCheck = ref('')

//creates a user document in users collection on firestore
const createUser = async (userID) => {
  await setDoc(doc(db, 'users', userID), { 
    uid: userID, 
    displayName: userStore.name, 
    email: userStore.email,
    currentEndGoalID: '' 
  })
}

const register = () => {
  if (password.value != passwordCheck.value){
    noti.setNotification({
      type: 'error',
      header: 'Passwords Must Match',
      message: 'Passwords did not match. Please try again.',
    })
    password.value = '' 
    passwordCheck.value  = ''
  }

  createUserWithEmailAndPassword(auth, userStore.email, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      
      createUser(user.uid)

      userStore.login(auth, password.value)
    
      updateProfile(auth.currentUser, { displayName: userStore.name })
        .then(() => {})
        .catch(() => {
          noti.setNotification({
            type: 'error',
            header: 'Something Went Wrong...',
            message: 'An error occurred.'
          })
        })
    .catch((error) => {
      const errorCode = error.code
    
      if (errorCode === 'auth/invalid-email'){
        noti.setNotification({
          type: 'error',
          header: 'Invalid Email',
          message: 'Please enter a valid email address.',
        })
      } else if (errorCode === 'auth/weak-password'){
        noti.setNotification({
          type: 'error',
          header: 'Weak Password',
          message: 'Your password should be at least 6 characters long.',
        })
      }
    })
  email = ''
  name = ''
  password.value = ''
  passwordCheck.value = ''
})}
</script>

<template>
  <div class="card">
    <header class="heading">
      <h1>Create your account to get started! 💪</h1>
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
        <p class="reminder-text">
          Already have an account? &nbsp;
        </p>
         
        <p class="normal-text">
          Click here to login.
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

.router {
  text-decoration: none
}
</style>
