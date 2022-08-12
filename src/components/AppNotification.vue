<script setup>
import { ref, onMounted } from 'vue'
import CloseButton from '@/icons/CloseButton.vue'
import { EventBus } from '@/event-bus.js'

let hidden = ref(true)

let type = ref('')
let header = ref('')
let message = ref('')

const bindEvents = () => {
  EventBus.on('notify', function( data ){
    handleNotification( data )
  }
  .bind(this))
}

const handleNotification = ( data ) => {
  type.value = data.type
  header.value = data.header
  message.value = data.message
  hidden.value = false

  setTimeout( function(){
    clearNotification()
  }.bind(this), 3500 )
}

const close = () => {
  clearNotification()
}

const clearNotification = () => {
  hidden.value = true;

	setTimeout( function(){
    type.value = '';
    header.value = '';
    message.value = '';
  }.bind(this), 1000 );
}

onMounted(() => {
  bindEvents()
})
</script>

<template>
  <div v-show="!hidden" :class="['noti', type]">
    <div class="top-bar">
      <div class="header">
        {{ header }}
      </div>
      <i
        class="close"
        @click="close"
      > 
        <CloseButton class="icon" />
      </i>
    </div>

    <p class="message">
      {{ message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.noti{
  display: flex;
  flex-direction: column;
  background-color: #1F1F1F;
  padding: 12px;
  border-radius: 8px;
  width: 50%;
}

.top-bar {
  display: flex;
  justify-content: space-between;
}

.close {
  display: flex;
  justify-content: center;
  width: 32px;
  border-radius: 4px;
  background-color: $red;
}
.icon{
  width: 20px;
  fill: white;
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
  font-size: large;
  font-weight: 800;
}
</style>