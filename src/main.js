/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import '@/styles/main.scss'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FB_PROJECT_ID + '.appspot.com',
  messagingSenderId: '79697638429',
  appId: '1:79697638429:web:8a962787e243fd773d82f4',
  measurementId: 'G-ZYCLNPQD64'
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

const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(FirestorePlugin)

app.mount('#app')
