<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useNotiesStore } from '@/store/notiesStore.js'
import { useUserStore } from '@/store/userStore.js'
import CleanButton from '@/components/CleanButton.vue'
import TextWrapper from '@/components/TextWrapper.vue'
import getDate from '@/helper.js'

const userStore = useUserStore()
const noti = useNotiesStore()

let currentEndGoal = ref('')
let firstTask = ref( 
  {
    title: '',
    priority: 3
  }
)


let enteredGoal = ref(false)

//top-bar message
let name = ref(userStore.name)
let dayName = ref(getDate())

const setEndGoal = () => {
  if(currentEndGoal.value){
    userStore.setNewEndGoal(currentEndGoal.value, firstTask.value)
    router.replace({name: 'tasks'}) 
  } else {
    noti.setNotification({
      type: 'error',
      header: 'Empty Goal',
      message: 'Please enter your End Goal.'
    })
  }
}

const addTask = () => {
  enteredGoal.value = true
}
</script>

<template>
  <div class="card">
    <p v-show="!enteredGoal" class="top-bar">
      Happy {{ dayName }}, {{ name }}!
    </p>
    <p v-show="enteredGoal" class="top-bar">
      Very cool!
    </p>

    <header class="heading">
      <h1 v-show="!enteredGoal">
        What is your End Goal?
      </h1>
      <h1 v-show="enteredGoal">
        Now, let's create your first task: 
      </h1>
    </header>

    <main class="content">
      <form 
        v-show="!enteredGoal"
        class="form" 
        @submit.prevent="addTask"
      >
        <TextWrapper
          v-model="currentEndGoal"
          placeholder="I will..."
          type="text"
        />
    
        <CleanButton
          background="green"
          text="Okay!"
          type="submit"
        />
      </form>

      <form
        v-show="enteredGoal" 
        class="form" 
        @submit.prevent="setEndGoal"
      >
        <TextWrapper
          v-model="firstTask.title"
          placeholder="My first task will be to..."
          type="text"
        />
    
        <CleanButton
          background="green"
          text="Let's Begin!"
          type="submit"
        />
      </form>
    </main>

    <div class="bottom-bar">
      <p class="reminder-text">
        Reminder: &nbsp; 
      </p>
         
      <p class="normal-text">
        Goals should be generalized and long-term.
      </p>
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

.top-bar {
   color: white;
  padding-left: 16px;
}
</style>
