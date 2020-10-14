import * as fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyBqavg-6nwbVh_0qdmU646SkmR8reoiNUA',
//   authDomain: 'https://my-vue-nasa-firebase.web.app/',
  authDomain: '',
  databaseURL: '',
  projectId: 'my-vue-nasa-firebase',
  storageBucket: '',
  messagingSenderId: '240425436498',
  appId: '1:240425436498:web:a17ed3496f99f31c57668b'
}
// initialize firebase app
fb.initializeApp(firebaseConfig)

// utils
const db = fb.firestore()
const auth_user = fb.auth()

// collection references
const usersCollection = db.collection('users')
const asteroidsCollection = db.collection('asteroids')

// export utils/refs
export {
  db,
  auth_user,
  usersCollection,
  asteroidsCollection
}