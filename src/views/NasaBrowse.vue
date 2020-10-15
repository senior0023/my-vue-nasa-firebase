<template>
  <div class="page">
    <div v-if="loading" class="loading">
      <p>Loading...</p>
    </div>
    <h2 class="page-header">
      NASA Browse - NASA NEO(Nearth Earth Object)
    </h2>
    <p v-if="showErrorMsg" class="error">{{ showErrorMsg }}</p>
    <p v-if="showFavoriteMsg" class="error">{{ addFavoriteMsg }}</p>
    <!-- get Neo feed by id -->
    <div class="neo-id-container">
      <label for="neo_id">Neo ID:</label>
      <input v-model.trim="neo_id" type="text" placeholder="2021277" id="nedo_id" />
      <button @click="searchNeoById()" class="button search"><fa icon="search" class="icon"></fa></button>
    </div>
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
            <th></th>
          </tr>
        </thead>
        <tbody v-if="datas.length">
          <tr v-for="(data, index) in datas" :key="data.id">
            <td>{{ index + 1 }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.neo_reference_id }}</td>
            <td>{{ data.absolute_magnitude_h }}</td>
            <td>{{ data.nasa_jpl_url }}</td>
            <td>
              <button @click="addToFavorites(data)" class="button favorite-btn" title="Add to favorites"><fa icon="heart" class="icon heart"></fa></button>
            </td>
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
        datas: [],
        loading: false,
        api_key: 'eIwAfFIAzJ8ChGli7AQGapj9CnLjZCVUoUYMNH5S',
        showErrorMsg: null,
        neo_id: null,
      }
    },
    created() {
      this.getAsteroids()
    },
    computed: {
      ...mapState(['addFavoriteMsg', 'userProfile']),
      showFavoriteMsg() {
        return this.addFavoriteMsg.length > 1 ? true : false
      }
    },
    methods: {
      // Neo Browse
      getAsteroids() {
        // clear error msg
        this.showErrorMsg = ''
        //set loading spinner
        this.loading = true
        // fetch 10 asteroids data
        let params = {
          page: 0,
          size: 10,
          api_key: this.api_key
        }

        this.axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse', {params: params})
          .then((response) => {
            this.datas = response.data.near_earth_objects
          })
          .catch(err => {
            this.showErrorMsg = err.response.data.error_message
          })
          .finally(() => {
            this.loading = false
          })
      },
      searchNeoById() {
        // clear error msg
        this.showErrorMsg = ''

        this.datas = []
        // set loading spinner
        this.loading = true

        let params = {
          api_key: this.api_key
        }
        if (this.neo_id.length > 0) {
          this.axios.get('https://api.nasa.gov/neo/rest/v1/neo/' + this.neo_id, {params: params})
          .then((response) => {
            this.datas.push(response.data)
          })
          .catch(err => {
            this.showErrorMsg = "Search failed. The asteroid is not existed"
          })
          .finally(() => {
            this.loading = false
          })
        } else {
          this.getAsteroids()
        }
      },
      addToFavorites(data) {
        this.showErrorMsg = ''
        this.addFavoriteMsg = ''
        data.user_id = this.userProfile.uid
        data.user_name = this.userProfile.name
        this.$store.dispatch('add_to_favorites', data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .neo-id-container {
    display: flex;
    flex-grow: 1;

    label {
      width: 100px;
      line-height: 3rem;
    }

    .search {
      margin-bottom: 1rem;
      min-width: 50px;
    }
  }

  .favorite-btn {
    width: 30px;
    height: 30px;
    min-width: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 50px;
    border: 2px solid #30A0EE;
    padding: 0.25rem;
  }
</style>