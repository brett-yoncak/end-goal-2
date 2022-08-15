/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import storeReset from "@/storeReset.js"
import router from './router'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import '@/styles/main.scss'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FB_PROJECT_ID + '.appspot.com',
  messagingSenderId: process.env.VUE_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FB_APP_ID,
  measurementId: process.env.VUE_APP_FB_MEASUREMENT_ID
}

//initializing firebase
initializeApp(firebaseConfig)

const FirestorePlugin = {
  install: (app, options) => {
    const db = getFirestore()
    app.provide('database', db) 
  }
};

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
pinia.use(storeReset)

const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(FirestorePlugin)

app.mount('#app')
