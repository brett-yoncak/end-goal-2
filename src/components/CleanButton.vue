<script setup>
import { defineProps } from 'vue'
const props = defineProps(
   {
      text: {
         type: String,
         required: true
      },

      background: {
         type: String,
         required: true
      }
   }
)

</script>

<template>
  <button 
    class="clean-button" 
    :class="background"
  >
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>

.clean-button {
   height: 80px;
   width: 100%;
   border: none;
   border-radius: 80px;
   font-size: 20px
}

.green {
   background: #3AE04B;
}

.red {
   background: #F3451E;
   color: white   
}

.grey {
   background: #565656;
   color: white
}
</style>