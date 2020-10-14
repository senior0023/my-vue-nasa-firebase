<template>
  <div class="main">
    <div class="sidebar">
      <div class="header">
        <router-link to="/">
          <h3>NASA Vue</h3>
        </router-link>
      </div>
      <div class="content">
        <ul class="inline">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/asteroids">Asteroids</router-link>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
        </ul>
      </div>
      <div class="footer">
        <a @click="logout()">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>