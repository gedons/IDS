<!-- src/components/Logs.vue -->
<template>
    <div>
      <h2>Logs</h2>
      <div v-if="logs.length === 0">No logs available</div>
      <ul>
        <li v-for="log in logs" :key="log._id">{{ log.message }}</li>
      </ul>
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
    async created() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://ids-api-lgwc.onrender.com/api/logs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.logs = response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            this.$router.push('/app/signin');
        } else {
            console.error("Error fetching logs:", error);
        }
      }
    }
  };
  </script>
  