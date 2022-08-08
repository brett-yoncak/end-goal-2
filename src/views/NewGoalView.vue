<script setup>
import { ref } from 'vue'
import CleanButton from '@/components/CleanButton.vue'

let currentEndGoal = ref('')
let username = 'Brett'

</script>

<template>
  <div class="grid">
    <span class="top-bar">
      Happy Monday, {{ username }}!
    </span>
    <header class="heading">
      <span>What is your End Goal?</span>
    </header>

    <main class="content">
      <form
        class="form"
      >  
        <input
          v-model="currentEndGoal"
          type="text"
          placeholder="I will..."
          class="text-container"
        >
    
        <CleanButton
          type="submit" 
          :text="`Let's Go!`"
          :background="`green`"
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
@import '@/styles/global.scss';

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
}

.reminder-text {
   color: #F3451E;
}

.normal-text {
   color: white;
}

.top-bar {
   grid-area: top;
   color: white;
}
</style>
