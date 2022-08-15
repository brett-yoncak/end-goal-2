<script setup>
const props = defineProps (
  {
    text: {
      type: String,
      required: true
    },

    background: {
      type: String,
      required: true
    }
})
</script>

<template>
  <button :class="['clean-button', background]">
    <h2>{{ text }}</h2>
  </button>
</template>

<style lang="scss" scoped>
.clean-button {
  padding: 1.6rem;   
  width: 100%;
  border: none;
  border-radius: 80px;
}

.green {
  background: $green;
}

.red {
  background: $red;
  color: white   
}

.grey {
  background: $grey;
  color: white
}
</style>
