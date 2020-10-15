<template>
  <div id="app">
    <navigation v-if="showNav"></navigation>
    <router-view/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Navigation from '@/components/Navigation'

  export default {
    components: {
      Navigation
    },
    computed: {
      ...mapState(['userProfile']),
      showNav() {
        return Object.keys(this.userProfile).length > 0 ? true : false
      }
    }
  }
</script>

<style>
  #app {
    display: flex;
    flex-direction: row;
  }
</style>