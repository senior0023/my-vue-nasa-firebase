<template>
  <div class="main">
    <div class="sidebar">
      <div class="header">
        <img src="@/assets/logo.png" class="header-logo"/>
        <router-link to="/">
          <h3>NASA Vue</h3>
        </router-link>
      </div>
      <div class="content">
        <ul class="inline content_nav">
          <li 
            :class="{ 'selected': selected === 0 }"
            @click="changeSelected(0)"
          >
            <router-link to="/"><fa icon="home" class="icon"></fa>Home</router-link>
          </li>
          <li
            :class='{ "selected": selected === 1} '
            @click='changeSelected(1)'
          >
            <router-link to="/nasa_browse"><fa icon="globe" class="icon"></fa>NEO Browse</router-link>
          </li>
          <li
            :class='{ "selected": selected === 2} '
            @click='changeSelected(2)'
          >
            <router-link to="/nasa_feeds"><fa icon="bullseye" class="icon"></fa>NEO Feeds</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'

  export default {
    setup() {
      const selected = ref(0)

      const changeSelected = (i) => {
        selected.value = i
      }
      
      return {
        changeSelected,
        selected
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-logo {
    width: 100%;
    height: auto;
  }

  ul.content_nav {
    width: 100%;
    position: relative;

    li {
      margin-bottom: 10px;
      padding: 10px 0;
      font-size: 0.9em;
      color: #d2dae2;
      cursor: pointer;

      &.selected {
        border-bottom: 1px solid;
        font-size: 1.2rem;
      }

      .icon {
        width: 15px;
        color: inherit;
        margin-right: 10px;
      }
    }
  }
</style>