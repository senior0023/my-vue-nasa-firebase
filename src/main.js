import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth_user } from './firebase'
import './assets/scss/app.scss'
import { FontAwesomeIcon } from '@/plugins/font-awesome'

let app
auth_user.onAuthStateChanged(user => {
    if (!app) {
        app = createApp(App)
            .use(store)
            .use(router)
            .component('fa', FontAwesomeIcon)
            .mount('#app')
    }

    if (user) {
        store.dispatch('fetchUserProfile', user)
    }
})
