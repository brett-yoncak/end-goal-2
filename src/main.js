import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyA_c4CQHApi7_JbPulwzYSKQVauuRanPyY',
    authDomain: 'end-goal-1ba81.firebaseapp.com',
    projectId: 'end-goal-1ba81',
    storageBucket: 'end-goal-1ba81.appspot.com',
    messagingSenderId: '79697638429',
    appId: '1:79697638429:web:8a962787e243fd773d82f4',
    measurementId: 'G-ZYCLNPQD64'
}

//initializing firebase 
initializeApp(firebaseConfig)

//initializing firestore
const db = getFirestore()
export default db

const app = createApp(App);

app.use(router);

app.mount('#app');
