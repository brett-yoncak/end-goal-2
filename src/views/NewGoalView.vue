<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore.js'
import CleanButton from '@/components/CleanButton.vue'
import TextWrapper from '@/components/TextWrapper.vue'
import getDate from '@/helper.js'

const userStore = useUserStore()

let currentEndGoal = ''

//top-bar message
let name = ref(userStore.name)
let dayName = ref(getDate)
</script>

<template>
  <div class="card">
    <p class="top-bar">
      Happy {{ dayName }}, {{ name }}!
    </p>

    <header class="heading">
      <h1>What is your End Goal?</h1>
    </header>

    <main class="content">
      <form class="form">
        <TextWrapper
          v-model="currentEndGoal"
          placeholder="I will..."
          type="text"
        />
    
        <CleanButton
          background="green"
          text="Let's Go!"
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
