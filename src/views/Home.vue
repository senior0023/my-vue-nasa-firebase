<template>
  <div class="page">
    <div v-if="favorites.length == 0" class="loading">
      <p>Loading...</p>
    </div>
    <h2 class="page-header">
      My Favorites
    </h2>
    <!-- <p v-if="userprofile && showFavoritesErrorMsg" class="error">{{ favoritesErrorMsg }}</p> -->
    <!-- table part -->
    <div class="table">
      <table class="styled-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Neo_ID</th>
            <th>Magnitude</th>
            <th>NASA_jpl_url</th>
          </tr>
        </thead>
        <tbody v-if="favorites.length">
          <tr v-for="(data, index) in favorites" :key="data.id">
            <td>{{ index + 1 }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.neo_reference_id }}</td>
            <td>{{ data.absolute_magnitude_h }}</td>
            <td>{{ data.nasa_jpl_url }}</td>
          </tr>
        </tbody>
        <tr v-else>No data</tr>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        loading: false,
      }
    },
    created() {
      this.loading = true
      this.getAsteroids()
    },
    computed: {
      // ...mapState(['userProfile', 'favorites', 'favoritesErrorMsg']),
      ...mapState(['favorites'])
      // showFavoritesErrorMsg() {
      //   return Object.keys(favoritesErrorMsg).length > 1
      // }
    },
    methods: {
      // Neo Browse
      getAsteroids() {
        // fetch favorite asteroids data
        this.$store.dispatch('fetchFavorites')
      },
    }
  }
</script>

<style lang="scss" scoped>
</style>