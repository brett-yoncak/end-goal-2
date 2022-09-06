<script setup>
import { ref } from 'vue'

let selectedFile = ref('')


</script>

<template>
  <div class="file-picker">
    <label for="file">Change Avatar</label> 
    <input type="file" id="file">
  </div>    
</template>
