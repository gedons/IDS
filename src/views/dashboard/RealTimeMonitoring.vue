<!-- src/components/RealTimeMonitoring.vue -->
<template>
    <div>
      <h2>Real-Time Monitoring</h2>
      <div v-if="logs.length">
        <h3>Recent Logs</h3>
        <ul>
          <li v-for="log in logs" :key="log._id">
            <p><strong>Source IP:</strong> {{ log.sourceIP }}</p>
            <p><strong>Destination IP:</strong> {{ log.destinationIP }}</p>
            <p><strong>Action:</strong> {{ log.action }}</p>
            <p><strong>Timestamp:</strong> {{ new Date(log.timestamp).toLocaleString() }}</p>
          </li>
        </ul>
      </div>
      <button @click="fetchRealTimeData">Refresh Data</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        logs: []
      };
    },
    methods: {
      async fetchRealTimeData() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/api/monitoring/real-time-data',{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.logs = response.data.logs;
        } catch (error) {
          console.log('Error fetching real-time data:', error);          
              const errorMessage = error.response && error.response.data && error.response.data.message
                  ? error.response.data.message
                  : 'An unexpected error occurred';
              this.$toast.info(errorMessage, { timeout: 11000 });
        }
      }
    },
    mounted() {
      this.fetchRealTimeData();
      setInterval(this.fetchRealTimeData, 5000); // Refresh every 5 seconds
    }
  };
  </script>
  