<script setup>
import { ref } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useNotiesStore } from '@/store/notiesStore.js'
import { useUserStore } from '@/store/userStore.js'
import CleanButton from '@/components/CleanButton.vue'
import TextWrapper from '@/components/TextWrapper.vue'
import getDate from '@/helper.js'

const noti = useNotiesStore()
const userStore = useUserStore()

let firstTask = ref( 
  {
    id: `${Date() + userStore.userID}`,
    title: '',
    priority: 1
  }
)

let enteredGoal = ref(false)
let goal = ref('')

//top-bar message
let { name } = storeToRefs(userStore)
let dayName = ref(getDate())
//

const setEndGoal = () => {
  if(goal.value){
    userStore.addNewEndGoal(goal.value, firstTask.value)
    router.replace({name: 'tasks'}) 
  } else {
    noti.setNotification({
      type: 'error',
      header: 'Empty Goal',
      message: 'Please enter your End Goal.'
    })
  }
}

const submitGoal = () => {
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
      <h1 v-if="!enteredGoal">
        What is your End Goal?
      </h1>
      <h1 v-if="enteredGoal">
        Now, let's create your first task: 
      </h1>
    </header>

    <main class="content">
      <form 
        v-show="!enteredGoal"
        class="form" 
        @submit.prevent="submitGoal"
      >
        <TextWrapper
          v-model="goal"
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
</style>
