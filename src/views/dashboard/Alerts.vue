<!-- src/components/Alerts.vue -->
<template>
  <div v-if="loading" class="screen_loader fixed inset-0 z-[60] grid place-content-center bg-[#fafafa] dark:bg-[#060818]">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
    >
        <circle cx="50" cy="50" r="0" fill="none" stroke="#47bdff" stroke-width="4">
            <animate
                attributeName="r"
                repeatCount="indefinite"
                dur="1s"
                values="0;16"
                keyTimes="0;1"
                keySplines="0 0.2 0.8 1"
                calcMode="spline"
                begin="0s"
            ></animate>
            <animate
                attributeName="opacity"
                repeatCount="indefinite"
                dur="1s"
                values="1;0"
                keyTimes="0;1"
                keySplines="0.2 0 0.8 1"
                calcMode="spline"
                begin="0s"
            ></animate>
        </circle>
        <circle cx="50" cy="50" r="0" fill="none" stroke="#b476e5" stroke-width="4">
            <animate
                attributeName="r"
                repeatCount="indefinite"
                dur="1s"
                values="0;16"
                keyTimes="0;1"
                keySplines="0 0.2 0.8 1"
                calcMode="spline"
                begin="-0.5s"
            ></animate>
            <animate
                attributeName="opacity"
                repeatCount="indefinite"
                dur="1s"
                values="1;0"
                keyTimes="0;1"
                keySplines="0.2 0 0.8 1"
                calcMode="spline"
                begin="-0.5s"
            ></animate>
        </circle>
    </svg>
   </div>
    <div v-else>
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
        alerts: [],
        loading: true
      };
    },
    async created() {
        this.fetchAlerts();
    },
    methods:{
        async fetchAlerts() {
         this.loading = true;
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
            }finally{
              this.loading = false;
            }
        },
    }
  };
  </script>
  