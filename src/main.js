import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth_user } from './firebase'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/scss/app.scss'
import { FontAwesomeIcon } from '@/plugins/font-awesome'

let app
auth_user.onAuthStateChanged(user => {
    if (!app) {
        app = createApp(App)
            .use(store)
            .use(router)
            .use(VueAxios, axios)
            .component('fa', FontAwesomeIcon)
            .mount('#app')
    }

    if (user) {
        store.dispatch('fetchUserProfile', user)
    }
})
