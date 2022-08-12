<script setup>
import {inject} from 'vue'
import { collection, addDoc, doc } from 'firebase/firestore'; 
const db = inject('database')
//SAVING THIS CODE HERE FOR FUTURE REF (next PR)
// const createTask = async (title, currentEndGoal) => {
//   const docRef = await addDoc(collection(db, 'users').doc().collection('tasks'), { 
//     title: title, 
//     endGoal: currentEndGoal 
//     })
//   console.log('Document written with ID: ', docRef.id)
// }
</script>

<template>
  <button> make a task </button>
</template>
