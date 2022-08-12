/* eslint-disable */
import { getFirestore } from 'firebase/firestore'

const db = getFirestore()

export default {
  install: (app, options) => {
    const createTask = (title, currentEndGoal) => {
    db.collection('tasks')
      .add({ title: title, endGoal: currentEndGoal }).then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    }
    app.provide('create-task', createTask) 
  }
};