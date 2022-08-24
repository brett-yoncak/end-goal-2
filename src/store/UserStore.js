import { defineStore } from 'pinia'
import router from '@/router'
import { useNotiesStore } from '@/store/notiesStore.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore'

const DefaultState = () => {   
  return {
   loggedIn: false,
   userID: '',
   name: '',
   email: '',
   currentEndGoal: '',
   currentEndGoalID: '',
   endGoals: [],
   tasks: [],
   archives: [],
  }
}

export const useUserStore = defineStore('userStore', {
  state: DefaultState,

  actions: {
    login(auth, password) {
      const noti = useNotiesStore()
      
      signInWithEmailAndPassword(auth, this.email, password)
        .then((userCredential) => {
          const user = userCredential.user
        
          const currentUser = auth.currentUser
        
          if (currentUser) {
            this.loggedIn = true
          
            this.name = user.displayName
          
            this.userID = user.uid
          
            this.email = user.email
            
            this.getEndGoalsAndTasks()
          }
        })
        .catch((error) => {
          const errorCode = error.code
        
          if (errorCode === 'auth/invalid-email') {
            noti.setNotification({
              type: 'error',
              header: 'Invalid Email',
              message: 'Please enter a valid email address.',
            })

          this.email = ''
          } else if (errorCode === 'auth/wrong-password') {
            noti.setNotification({
              type: 'error',
              header: 'Incorrect Password',
              message: 'Please try again.',
            })
          
          this.email = ''
          } else if (errorCode === 'auth/user-not-found') {
            noti.setNotification({
              type: 'error',
              header: 'User Not Found',
              message: 'Please enter a valid email address and password, or create a new account.',
            })
          
          this.email = ''
          } else {
            noti.setNotification({
              type: 'error',
              header: 'Something went VERY wrong.',
              message: 'Please try again.',
            })
          
          this.email = ''
          }
        })
    },

    logout() {
      const noti = useNotiesStore()

      if(this.loggedIn){
        noti.setNotification({
          type: 'success',
          header: 'Goodbye!',
          message: 'Have a nice day.',
        })

        this.$reset()
      } else {        
        noti.setNotification({
          type: 'error',
          header: 'Already logged out.',
          message: 'Login to get started!',
        })
      }  
    },

    setName(name) {
      this.name = name
    },

    async assignCurrentEndGoalOnFB(title, id) {
      const userRef = doc(this.db, 'users', `${this.userID}`)
      
      await updateDoc(userRef, {
        currentEndGoalID: id,
        currentEndGoal: title
      })
    },

    async addNewEndGoal(endGoal, firstTask) {
      const goal = {
        goalID: `${Date() + this.userID}`,
        tasks: [firstTask],
        title: endGoal,
        uid: this.userID
      }

      this.currentEndGoalID = goal.goalID
      
      this.currentEndGoal = goal.title
      
      this.assignCurrentEndGoalOnFB(goal.title, goal.goalID)

      await addDoc(collection(this.db, 'endGoals'), goal)
    },

    async getEndGoalsAndTasks() {
      
      const q = query(collection(this.db, 'endGoals'), where('uid', '==', `${this.userID}`)) 
      
      const querySnap = await getDocs(q)

      if(querySnap){      
        const userRef = doc(this.db, 'users', `${this.userID}`)
        
        const userSnap = await getDoc(userRef)
        
        if (userSnap.data().currentEndGoal) {
          this.currentEndGoal = await userSnap.data().currentEndGoal
        
          this.currentEndGoalID = await userSnap.data().currentEndGoalID
        
          querySnap.forEach((goal) => {
            this.endGoals.push(goal.data())
          })
        } else {
          router.replace({name: 'new'})
        }
        //set current goal and get tasks  
        let currentGoal = await this.endGoals.find(goal => goal.goalID === this.currentEndGoalID)
        
        if (currentGoal) {
          this.tasks = currentGoal.tasks
                    
          router.replace({name: 'tasks'})
        } else {
          router.replace({name: 'new'})
        } 
      } else {
        router.replace({name: 'new'})
      }
    },

    //SAVING FOR LATER
    // async addTask(title, priority) {
    //   const q = query(collection(db, 'endGoals'), where('uid', '==', `${this.userID}`), where('title', '==', `${this.currentEndGoal}`)) 
      
    //   const querySnap = await getDoc(q)
      
    //   await addDoc(querySnap.tasks, {
    //     title: title,
    //     priority: priority
    //   })
    // }
  },
  
  persist: true
})
