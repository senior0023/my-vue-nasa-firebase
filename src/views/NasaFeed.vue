<template>
  <div class="page">
    <h2 class="page-header">
      NASA Feed List
    </h2>
    <p v-if="showErrorMsg" class="error">{{ showErrorMsg }}</p>
    <!-- Date picker -->
    <div class="date-picker">
      <p>Start date: </p>
      <date-picker @update="dateUpdated('START_DATE', $event)"/>
      <p>End date: </p>
      <date-picker @update="dateUpdated('END_DATE', $event)"/>
    </div>
    <!-- Select a specific date -->
    <p>Select data to see a list of asteroids based on their closest approach date to Earth: </p>
    <div class="custom-select">
        <select @change="dateSelected($event)">
            <option
                v-for="(item, index) in dates"
                :key="index"
                :value="item">
                {{ item }}
            </option>
        </select>
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
  import DatePicker from '@/components/DatePicker.vue'
  import moment from 'moment'

  export default {
    data() {
      return {
        dates: [],
        datas: [],
        data_all: [],
        loading: false,
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        api_key: 'eIwAfFIAzJ8ChGli7AQGapj9CnLjZCVUoUYMNH5S',
        selected_date: moment().format('YYYY-MM-DD'),
        showErrorMsg: null
      }
    },
    computed() {

    },
    created() {
      this.getNeoFeeds()
    },
    components: {
      DatePicker
    },
    methods: {
      // Neo Feed API
      getNeoFeeds() {
        // set loading spinner
        this.loading = true
        // fetch Neo Feeds with date
        let params = {
          start_date: this.start_date,
          end_date: this.end_date,
          detailed: false,
          api_key: this.api_key
        }

        this.axios.get('https://api.nasa.gov/neo/rest/v1/feed', {params: params})
            .then((response) => {
                this.data_all = response.data.near_earth_objects
                this.dates = Object.keys(this.data_all).sort()
                this.selected_date = this.dates[0]
                this.datas = this.data_all[this.selected_date].slice(0,10)
            })
            .catch(err => {
                this.showErrorMsg = err.response.data.error_message
            })
            .finally(() => {
                this.loading = false
            })
      },
      dateUpdated(key, $event) {    
        this.showErrorMsg = null    
        if (key == 'START_DATE') {
          this.start_date = $event
        } else if (key == 'END_DATE') {
          this.end_date = $event
        }
        // fetch data using Neo Feed API
        this.getNeoFeeds()
      },
      dateSelected($event) {
          this.selected_date = $event.target.value
          console.log(this.selected_date)
          this.datas = this.data_all[this.selected_date].slice(0,10)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .date-picker {
    display: flex;
    flex-grow: 1;  
  }

  p {
    line-height: 2;
    margin-right: 5px;
  }

  /* wrapper-div for including arrow */
    .custom-select {
        background-color: #30A0EE;
        float: left;
        margin-right: 10px;
        position: relative;
        margin-bottom: 10px;    
    }

    .custom-select select {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none; /* remove default styling */
        background-color: inherit;
        border: none;
        color: white;
        display: block;
        font-size: 16px;
        height: 32px;
        padding: 5px 30px 5px 10px;
        margin: 0;
        outline: none;
    }

    /* drop arrow */
    .custom-select:after {
        content: '\25bc'; 
        color: #AAA;
        font-size: 12px;
        position: absolute;
        right: 8px;
        top: 10px;
    }
</style>