<script setup>
import { ref, onUpdated, computed } from 'vue'
import { storeToRefs } from 'pinia'
import CloseButton from '@/icons/CloseButton.vue'
import { useNotiesStore } from '@/store/notiesStore'

const noti = useNotiesStore()

let { hidden, type, header, message } = storeToRefs(noti)

let notiType = type
let notiHeader = header
let notiMessage = message

let handleNotification = () => {
  setTimeout(clearNotification, 3500 )
}

const close = () => {
  noti.turnOffNotification()
  
  clearNotification()
}

const clearNotification = () => {
  noti.turnOffNotification()
	
  setTimeout(() => {
    notiType = ''
    notiHeader = ''
    notiMessage = ''
  }, 1000 );
}

onUpdated(() => {
  handleNotification()
})
</script>

<template>
  <div v-if="!hidden" :class="['noti', type]">
    <div class="close-bar">
      <div class="header">
        <h1>{{ header }}</h1>
      </div>
      <i class="close-icon" @click="close"> 
        <CloseButton class="x-icon" />
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

.close-bar {
  display: flex;
  justify-content: space-between;
}

.close-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: $red;
}

.x-icon{
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
