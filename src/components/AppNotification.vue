<script setup>
import { ref, onUpdated, computed } from 'vue'
import CloseButton from '@/icons/CloseButton.vue'
import { useNotiesStore } from '@/store/notiesStore'

const noti = useNotiesStore()

let hidden = computed(() => {
  return noti.hidden
})

let notification = computed(() => {
  return noti.notification
})

let type = ref('')
let header = ref('')
let message = ref('')

let handleNotification = () => {
  type.value = notification.value.type
  header.value = notification.value.header
  message.value = notification.value.message
  setTimeout(clearNotification, 3500 )
}

const close = () => {
  noti.turnOffNotification()
  clearNotification()
}

const clearNotification = () => {
  noti.turnOffNotification()
	setTimeout(() => {
    type.value = ''
    header.value = ''
    message.value = ''
    }
    , 1000 );
}

onUpdated(() => {
  handleNotification()
})
</script>

<template>
  <div v-if="!hidden" :class="['noti', type]">
    <div class="top-bar">
      <div class="header">
        <h1>{{ header }}</h1>
      </div>
      <i class="close" @click="close"> 
        <CloseButton class="icon" />
      </i>
    </div>

    <p>
      {{ message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.noti {
  position: fixed;
  left: 50%; 
  transform: translateX(-50%);
  margin-top: 12px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  background-color: #1F1F1F;
  padding: 12px;
  border-radius: 8px;
  width: 50%;
  box-shadow: -2px 8px 24px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
}

.close {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: $red;
}

.icon{
  fill: white;
  width: 24px;
  padding: 2px 6px 2px 6px;
}

.error {
  color: $red;
  border: solid 1px $red;
}

.success {
  color: $green;
  border: solid 1px $green;
}

.header {
  align-self: center;
}
</style>
