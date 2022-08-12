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
    <span class="top-bar">
      Happy {{ dayName }}, {{ name }}!
    </span>

    <header class="heading">
      <span>What is your End Goal?</span>
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
      <span class="reminder-text">
        Reminder: &nbsp; 
      </span>
         
      <span class="normal-text">
        Goals should be generalized and long-term. Keep it broad.
      </span>
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
   font-size: $f2;
  padding-left: 16px;
}
</style>
