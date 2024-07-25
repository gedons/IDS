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
    <!-- <div v-else>
      <h2>Anomalies Responses</h2>
      <div v-if="ibmResponses.length === 0">No IBM responses available</div>
      <ul>
        <li v-for="response in ibmResponses" :key="response._id">
          {{ response.ip }}: {{ response.reasonDescription }}
        </li>
      </ul>
    </div> -->

    <div v-else>
      <section class="bg-gradient-to-t from-white/50 to-transparent py-14 dark:from-white/[0.02] md:py-20">
        <div class="container">
          <div class="mb-10">
            <h6 class="mb-4 text-lg font-extrabold uppercase text-secondary">IBM Responses</h6>
            <h2 class="text-3xl font-black leading-tight text-black dark:text-white md:text-[40px]">Network Log Responses</h2>
          </div>
          
          <span v-if="loading" class="flex items-center">
            <h1 class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></h1>
            <span class="ml-1">Fetching responses...</span>
          </span>
          <div v-else>
            <div class="text-2xl" v-if="ibmResponses.length === 0">No responses available</div>
            <div class="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="response in ibmResponses" :key="response._id">
                <div
                  class="relative border-[2px] border-white bg-gradient-to-b from-white/50 to-transparent p-5 shadow-[-20px_30px_70px_rgba(219,222,225,0.4)] transition hover:border-secondary/50 hover:bg-secondary/20 dark:border-[rgba(119,128,161,0.15)] dark:bg-black dark:from-transparent dark:shadow-none dark:hover:border-secondary/50 dark:hover:bg-secondary/10 md:p-8"
                >
                  <h5 class="pt-7 pb-3 text-[22px] font-bold text-black dark:text-white">IP: {{ response.ip }}</h5>
                  <p class="text-lg leading-loose line-clamp-3"><span>Log Message: </span>{{ response.log.message }}</p>                  
                  <p class="text-sm leading-loose line-clamp-3"><span>Timestamp: </span>{{ new Date(response.timestamp).toLocaleString() }}</p>
                  <div class="mt-4">
                    <p><strong>IBM Response:</strong></p>
                    <p><strong>IP:</strong> {{ response.response.ip }}</p>
                    <p><strong>Score:</strong> {{ response.response.score }}</p>
                    <p><strong>Reason:</strong> {{ response.response.reason }}</p>
                    <button @click="openModal(response)" class="mt-4 py-2 text-secondary dark:text-white">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
        <div class="relative w-11/12 max-w-3xl p-5 bg-white rounded shadow-lg dark:bg-gray-800">
          <button @click="closeModal" class="absolute top-0 right-0 mt-2 mr-2 text-gray-600 dark:text-gray-200">✖</button>
          <div class="p-6">
            <h2 class="mb-4 text-2xl font-bold">Response Details</h2>
            <p><strong>IP:</strong> {{ selectedResponse.response.ip }}</p>
            <p><strong>Score:</strong> {{ selectedResponse.response.score }}</p>
            <p><strong>Reason:</strong> {{ selectedResponse.response.reason }}</p>
            <p><strong>Country:</strong> {{ selectedResponse.response.geo.country }}</p>
            <p><strong>Country Code:</strong> {{ selectedResponse.response.geo.countrycode }}</p>
            <p><strong>Category:</strong> {{ selectedResponse.response.categoryDescriptions['Dynamic IPs'] }}</p>
            
            <!-- <div v-if="selectedResponse.response.history.length">
              <h3 class="mt-4 text-xl font-semibold">History</h3>
              <ul>
                <li v-for="history in selectedResponse.response.history" :key="history.created">
                  <p><strong>Created:</strong> {{ new Date(history.created).toLocaleString() }}</p>
                  <p><strong>Reason:</strong> {{ history.reason }}</p>
                  <p><strong>Score:</strong> {{ history.score }}</p>
                  <p><strong>Country:</strong> {{ history.geo.country }}</p>
                  <p><strong>Country Code:</strong> {{ history.geo.countrycode }}</p>
                  <p><strong>IP:</strong> {{ history.ip }}</p>
                </li>
              </ul>
            </div>
            
            <!-- <div v-if="selectedResponse.response.subnets.length">
              <h3 class="mt-4 text-xl font-semibold">Subnets</h3>
              <ul>
                <li v-for="subnet in selectedResponse.response.subnets" :key="subnet.created">
                  <p><strong>Created:</strong> {{ new Date(subnet.created).toLocaleString() }}</p>
                  <p><strong>Reason:</strong> {{ subnet.reason }}</p>
                  <p><strong>Score:</strong> {{ subnet.score }}</p>
                  <p><strong>Country:</strong> {{ subnet.geo.country }}</p>
                  <p><strong>Country Code:</strong> {{ subnet.geo.countrycode }}</p>
                  <p><strong>IP:</strong> {{ subnet.ip }}</p>
                  <p><strong>Subnet:</strong> {{ subnet.subnet }}</p>
                </li>
              </ul>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        ibmResponses: [],
        loading: true,
        showModal: false,
        selectedResponse: null,
      };
    },
    async created() {
      this.fetchResponses();
    },
    methods: {
      async fetchResponses() {
        this.loading = true;
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/api/ibm-responses', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.ibmResponses = response.data;
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            this.$router.push('/app/signin');
          } else {
            console.error('Error fetching responses:', error);
          }
        } finally {
          this.loading = false;
        }
      },
      openModal(response) {
        this.selectedResponse = response;
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.selectedResponse = null;
      },
    },
  };
  </script>
  