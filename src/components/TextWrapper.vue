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
  <input
    class="text-container"
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<style lang="scss" scoped>
.text-container {
   @include text-input-container;
}
</style>
