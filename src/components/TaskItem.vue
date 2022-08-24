<script setup>
import GreenDot from '@/icons/GreenDot.vue';
import RedDot from '@/icons/RedDot.vue'
import YellowDot from '@/icons/YellowDot.vue';

const props = defineProps({
  priority: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="task">
    <div class="priority">
      <RedDot v-if="priority === 1" />
      <YellowDot v-if="priority === 2" />
      <GreenDot v-if="priority === 3" />
    </div>
    <h2>
      <slot />
    </h2>
  </div>
</template>

<style lang="scss" scoped>
.priority {
  width: 64px;
  margin-right: 20px;
}
</style>