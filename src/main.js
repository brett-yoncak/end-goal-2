/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"
import { initializeApp} from 'firebase/app'
import storeReset from "@/storeReset.js"
import '@/styles/main.scss'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FB_PROJECT_ID + '.appspot.com',
  messagingSenderId: process.env.VUE_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FB_APP_ID,
  measurementId: process.env.VUE_APP_FB_MEASUREMENT_ID,
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET
}

//initializing firebase
initializeApp(firebaseConfig)

//setting firestore & storage
const db = getFirestore()
const storage = getStorage()

//creating store
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

pinia.use(storeReset)

//App
const app = createApp(App)

//allows inject firestore & storage into any component
app.provide('db', db)
app.provide('storage', storage)

//allows this.db use in any store
pinia.use(() => ({db}))

app.use(router)

app.use(pinia)

app.mount('#app')
