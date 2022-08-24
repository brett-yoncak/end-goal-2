<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/userStore.js'
import { useNotiesStore } from '@/store/notiesStore.js'
import CleanButton from '@/components/CleanButton.vue'
import OptionsIcon from '@/icons/OptionsIcon.vue'
import TaskItem from '@/components/TaskItem.vue'
import TextWrapper from '@/components/TextWrapper.vue'

const userStore = useUserStore()
const noti = useNotiesStore()

let { currentEndGoal, tasks } = storeToRefs(userStore)

onMounted(() => {
  userStore.tasks = []
  userStore.getEndGoalsAndTasks()
})

//SAVING FOR LATER
// let addTask = (title, priority) => {
//   userStore.addTask(title, priority)
// }
</script>

<template>
  <div class="card">
    <div class="top-bar options">
      <i class="router">
        <OptionsIcon />
      </i>
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
