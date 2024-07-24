<!-- src/components/IbmResponses.vue -->
<template>
    <div>
      <h2>IBM Responses</h2>
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
        ibmResponses: []
      };
    },
    async created() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://ids-api-lgwc.onrender.com/api/ibm-responses', {
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
      }
    }
  };
  </script>
  