<template>
  <div class="page">
    <h2 class="page-header">
      Asteroids List - NASA NEO(Nearth Earth Object)
    </h2>
    <div class="search">
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
          </tr>
        </thead>
        <tbody v-if="datas.length">
          <tr v-for="(data, index) in datas" :key="data.id">
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
export default {
  data() {
    return {
      datas: [],
      loading: false
    }
  },
  computed() {

  },
  created() {
    this.getAsteroids()
  },
  methods: {
    getAsteroids() {
      //set loading spinner
      this.loading = true
      // fetch 10 asteroids data
      let params = {
        page: 0,
        size: 10,
        api_key: 'eIwAfFIAzJ8ChGli7AQGapj9CnLjZCVUoUYMNH5S'
      }

      this.axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse', {params: params})
        .then((response) => {
          this.datas = response.data.near_earth_objects
          console.log('datas: ', this.datas)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>