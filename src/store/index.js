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
    addFavoriteMsg: '',
    favoritesErrorMsg: '',
    favorites: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setAuthErrorMsg(state, val) {
      state.authErrorMsg = val
    },
    setAddFavoriteMsg(state, val) {
      state.addFavoriteMsg = val
    },
    setFavorites(state, val) {
      state.favorites = val
    },
    setFavoritesErrorMsg(state, val) {
      state.favoritesErrorMsg = val
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
      let data = userProfile.data()
      data.uid = user.uid
      // set user profile in state
      commit('setUserProfile', data)

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
    },

    async add_to_favorites({ commit }, data) {
      try {
        commit('setAddFavoriteMsg', '')
        // get already existed document
        let item = null; 
        const snapshot = await firebase.asteroidsCollection.where("name", "==", data.name).where("user_id", "==", data.user_id).limit(1).get()
        snapshot.forEach((doc) => {
          item = doc.data()
        })
        if (item == null) {
          // add Neo asteroid data to 'asteroids' collection
          await firebase.asteroidsCollection.doc(data.name).set(data)
        } else {
          commit('setAddFavoriteMsg', 'This data is alreay existed.')
        }
      } catch(err) {
        commit('setAddFavoriteMsg', err.message)
      }
    },

    async fetchFavorites({ commit }) {
      try {
        console.log('store:', store.state.userProfile)
        // get my favorite data
        let favorites = []
        const snapshot = await firebase.asteroidsCollection.get()
        snapshot.forEach(doc => {
          let favorite = doc.data()
          favorite.id = doc.id

          favorites.push(favorite)
        })

        commit('setFavorites', favorites)
      } catch(err) {
        console.log('err: ', err.message)
        commit('setFavoritesErrorMsg', err.message)
      }
    }
  }
})

export default store