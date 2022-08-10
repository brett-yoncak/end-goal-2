<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/UserStore.js'
import CleanButton from '@/components/CleanButton.vue'

const userStore = useUserStore()

let currentEndGoal = ''

//top-bar message
let name = userStore.name
let date = new Date()
let dayNumber = date.getDay()
let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let dayName = dayNames[dayNumber]
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
          type="text"
          placeholder="I will..."
          class="text-container"
        >
    
        <CleanButton
          type="submit" 
          text="Let's Go!"
          background="green"
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
