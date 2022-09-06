<script setup>
import { onMounted, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/userStore.js'
import { useNotiesStore } from '@/store/notiesStore.js'
import { getAuth } from 'firebase/auth'
import CleanButton from '@/components/CleanButton.vue'
import OptionsIcon from '@/icons/OptionsIcon.vue'
import TaskItem from '@/components/TaskItem.vue'
import TextWrapper from '@/components/TextWrapper.vue'
import { uploadBytes, ref } from '@firebase/storage'

const storage = inject('storage')
const userStore = useUserStore()
const noti = useNotiesStore()

let { currentEndGoal, tasks } = storeToRefs(userStore)

//SAVING FOR LATER
// let addTask = (title, priority) => {
//   userStore.addTask(title, priority)
// }

let file = {}
let fileName = ''

const uploadTask = () => {
  const imageRef = ref(storage, `/images/${fileName}`)
  
  console.log(imageRef)

  uploadBytes(imageRef, file)
    .then((snapshot) => {
      console.log('Uploaded!')
      file = {}
    })
    .catch((error) => {
      console.log(error)
    })
}

const previewFiles = (e) => {
  file = e.target.files;
  fileName = file[0].name
  console.log(fileName)
}

// const uploadPicture = () => {
//   firebase.storage
// }
</script>

<template>
  <div class="card">
    <div class="top-bar options">
      <span>...</span>
    </div>

    <header class="heading">
      <h1>{{ currentEndGoal }}</h1>
    </header>

    <article
      v-for="task in tasks"
      :key="task.id"
      class="content"
    >
      <TaskItem :priority="task.priority">
        {{ task.title }}
      </TaskItem>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.reminder-text {
  color: $red;
}

.normal-text {
  color: white;
}

.router {
  text-decoration: none;
  padding: 8px 0 8px 8px;
  cursor: pointer;
}
</style>
