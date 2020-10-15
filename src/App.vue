<template>
  <div id="app">
    <navigation v-if="showNav"></navigation>
    <div class="setting">
      <p>{{ userProfile.name }}</p>
      <a @click="logout()">Logout</a>
    </div>
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

<style lang="scss" scoped>
  #app {
    display: flex;
    flex-direction: row;
  }

  .setting {
    width: 100%;
    height: 100px;
    position: fixed;
    text-align: right;
    padding-right: 2rem;
    background: white;
    z-index: 1;
    display: flex;
    flex-direction: column;

    p {
      top: 25px;
      position: relative;
    }

    a {
      position: relative;
      top: 30px;
    }
  }
</style>