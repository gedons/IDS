<!-- src/components/Alerts.vue -->
<template>
    <div>
      <h2>Alerts</h2>
      <div v-if="alerts.length === 0">No alerts available</div>
      <ul>
        <li v-for="alert in alerts" :key="alert._id">{{ alert.message }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        alerts: []
      };
    },
    async created() {
        this.fetchAlerts();
    },
    methods:{
        async fetchAlerts() {
         try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://ids-api-lgwc.onrender.com/api/alerts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            this.alerts = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Token expired or invalid
                    localStorage.removeItem('token');
                    this.$router.push('/app/signin');
                } else {
                    console.error("Error fetching alerts:", error);
                }
            }
        },
    }
  };
  </script>
  