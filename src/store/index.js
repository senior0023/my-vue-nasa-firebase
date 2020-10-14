import { createApp} from 'vue'
import Vuex from 'vuex'
import * as firebase from '../firebase'
import router from '../router/index'

const app = createApp()
app.use(Vuex)

const store = new Vuex.Store({
  state: {
    userProfile: {},
    authErrorMsg: '',
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setAuthErrorMsg(state, val) {
      state.authErrorMsg = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      try {
        // user login
        const { user } = await firebase.auth_user.signInWithEmailAndPassword(form.email, form.password)

        // dispatch action for fetching user data and setting it in state
        dispatch('fetchUserProfile', user)
      } catch(err) {
        this.commit('setAuthErrorMsg', err.message)
      }
    },
    
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await firebase.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to home from login
      if (router.currentRoute.value.path === '/login') {
        router.push('/')
      }
    },

    async signup({ dispatch }, form) {
      try {
        // sign user up
        const { user } = await firebase.auth_user.createUserWithEmailAndPassword(form.email, form.password)

        // creat user profile object in userCollections
        await firebase.usersCollection.doc(user.uid).set({
          name: form.name
        })

        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      } catch(err) {
        this.commit('setAuthErrorMsg', err.message)
      }
    },

    async logout({ commit }) {
      await firebase.auth_user.signOut()

      //clear userProfile and redirect to /login
      commit('setUserProfile', {})
      
      router.push('/login')
    }
  }
})

export default store