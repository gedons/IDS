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
      <section class="bg-gradient-to-t from-white/50 to-transparent py-14 dark:from-white/[0.02] md:py-20">
        <div class="container">
            <div class="mb-10">
                <h6 class="mb-4 text-lg font-extrabold uppercase text-secondary">Log Alerts</h6>
                <h2 class="text-3xl font-black leading-tight text-black dark:text-white md:text-[40px]">Available Network Log Alerts</h2>
            </div>
            
            <span v-if="loading" class="flex items-center">
                <h1 class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></h1>
                <span class="ml-1">Fetching alerts...</span>
            </span>
            <div v-else>
                <div class="text-2xl" v-if="alerts.length === 0">No alerts available</div>
                <div class="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
                    <div v-for="alert in alerts" :key="alert.id">
                    <div
                        class="relative border-[2px] border-white bg-gradient-to-b from-white/50 to-transparent p-5 shadow-[-20px_30px_70px_rgba(219,222,225,0.4)] transition hover:border-secondary/50 hover:bg-secondary/20 dark:border-[rgba(119,128,161,0.15)] dark:bg-black dark:from-transparent dark:shadow-none dark:hover:border-secondary/50 dark:hover:bg-secondary/10 md:p-8"
                    >
                    
                        <h5 class="pt-7 pb-3 text-[22px] font-bold text-black dark:text-white">{{ alert.message }}</h5>
                        <p class="text-lg leading-loose line-clamp-3"><span>source IP: </span>{{ alert.sourceIP }}</p>
                        <p class="text-lg leading-loose line-clamp-3"><span>destination IP: </span>{{ alert.destinationIP }}</p>  
                        <button @click="viewAlert(alert._id)" class="mt-4 py-2 text-secondary dark:text-white">Expand</button>
                        <button @click="deletealert(alert._id)" class="mt-4 px-4 py-2 text-secondary dark:text-white">Delete</button>
                    </div>
                </div>
                </div>  
            </div>             
        </div>
      </section>   
      
      <div v-if="selectedAlert" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white dark:bg-black p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h2 class="text-2xl font-bold mb-4">{{ selectedAlert.message }}</h2>
          <p><strong>Source IP:</strong> {{ selectedAlert.sourceIP }}</p>
          <p><strong>Destination IP:</strong> {{ selectedAlert.destinationIP }}</p>
          <p><strong>Protocol:</strong> {{ selectedAlert.protocol }}</p>
          <p><strong>Action:</strong> {{ selectedAlert.action }}</p>
          <p><strong>Severity:</strong> {{ selectedAlert.severity }}</p>
          <p><strong>Type:</strong> {{ selectedAlert.type }}</p>
          <button @click="closeModal" class="mt-4 py-2 px-4 bg-secondary text-white rounded">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        alerts: [],
        loading: true,
        selectedAlert: null,
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

        async viewAlert(alertId) {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://ids-api-lgwc.onrender.com/api/alerts/single/${alertId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            this.selectedAlert = response.data;
          } catch (error) {
            console.error('Error fetching alert:', error);
            this.$toast.error(error.response?.data?.message || 'An error occurred', { timeout: 11000 });
          }
        },
        closeModal() {
          this.selectedAlert = null;
        },

    }
  };
  </script>
  