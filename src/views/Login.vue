<template>
  <div id="login">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <section>
      <div class="col1">
        <h1>NASA with Vue.js</h1>
        <p>Welcome to the NASA api web app powered by Vue.js and Firebase.</p>
        <p>Author: junjie.lee0305@gmail.com</p>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome</h1>
          <p v-if="showErrorMsg" class="error">{{ authErrorMsg }}</p>
          <div>
            <label for="email1">Email</label>
            <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div>
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password</a>
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
            <h1>Get Started</h1>
            <div>
                <label for="name">Name</label>
                <input v-model.trim="signupForm.name" type="text" placeholder="John" id="name" />
            </div>
            <div>
                <label for="email2">Email</label>
                <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
            </div>
            <div>
                <label for="password2">Password</label>
                <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
            </div>
            <button @click="signup()" class="button">Sign Up</button>
            <div class="extras">
                <a @click="toggleForm()">Back to Log In</a>
            </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            // add property to data()
            showLoginForm: true,
            showPasswordReset: false,
            // add login form to data()
            loginForm: {
                email: '',
                password: ''
            },
            // add signup form to date()
            signupForm: {
                name: '',
                email: '',
                password: ''
            },
        }
    },
    components: {
        PasswordReset
    },
    computed: {
      ...mapState(['authErrorMsg']),
      showErrorMsg() {
        return this.authErrorMsg.length > 1 ? true : false
      }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                email: this.loginForm.email,
                password: this.loginForm.password
            })
        },
        signup() {
            this.$store.dispatch('signup', {
                email: this.signupForm.email,
                password: this.signupForm.password,
                name: this.signupForm.name
            })
        },
        // add toggleForm method
        toggleForm() {
            this.showLoginForm = !this.showLoginForm
        },
        // add togglePasswordReset method
        togglePasswordReset() {
            this.showPasswordReset = !this.showPasswordReset
        }
    }
}
</script>