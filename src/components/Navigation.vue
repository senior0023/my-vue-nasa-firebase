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
            <router-link to="/nasa_browse">NASA Browse</router-link>
          </li>
          <li>
            <router-link to="/nasa_feeds">NASA Feeds</router-link>
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