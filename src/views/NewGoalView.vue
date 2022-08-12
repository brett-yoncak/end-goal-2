<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore.js'
import CleanButton from '@/components/CleanButton.vue'
import getDate from '@/helper.js'

const userStore = useUserStore()

let currentEndGoal = ''

//top-bar message
let name = ref(userStore.name)
let dayName = ref(getDate)
</script>

<template>
  <div class="grid">
    <span class="top-bar">
      Happy {{ dayName }}, {{ name }}!
    </span>

    <header class="heading">
      <span>What is your End Goal?</span>
    </header>

    <main class="content">
      <form class="form">  
        <input
          v-model="currentEndGoal"
          class="text-container"
          placeholder="I will..."
          type="text"
        >
    
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
        Goals should be generalized and long-term. Keep it broad and lofty.
      </span>
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
   font-size: $f2;
}

.reminder-text {
   color: $red;
}

.normal-text {
   color: white;
}

.top-bar {
   grid-area: top;
   color: white;
   font-size: $f2;
}
</style>
