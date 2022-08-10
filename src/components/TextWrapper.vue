<script setup>
const props = defineProps (
  {
    modelValue: {
      type: String,
      default: ''
    }
  }
)

const emits = ['update:modelValue']
</script>

<template>
  <div class="container">
    <input
      class="text-container"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>  
</template>

<style lang="scss" scoped>
.text-container {
   @include text-input-container;
}
</style>
