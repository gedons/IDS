<!-- src/components/IbmResponses.vue -->
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
      <h2>Anomalies Responses</h2>
      <div v-if="ibmResponses.length === 0">No IBM responses available</div>
      <ul>
        <li v-for="response in ibmResponses" :key="response._id">
          {{ response.ip }}: {{ response.reasonDescription }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        ibmResponses: [],
        loading: false
      };
    },
    async created() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/ibm-responses', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.ibmResponses = response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            this.$router.push('/app/signin');
        } else {
            console.error("Error fetching Ibm responses:", error);
        }
      }finally{
        this.loading = false;
      }
    }
  };
  </script>
  