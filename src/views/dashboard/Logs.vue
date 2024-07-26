<!-- src/components/Logs.vue -->
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
                  <h6 class="mb-4 text-lg font-extrabold uppercase text-secondary">Network Logs</h6>
                  <h2 class="text-3xl font-black leading-tight text-black dark:text-white md:text-[40px]">Available Network Logs</h2>
              </div>
              
              <span v-if="loading" class="flex items-center">
                  <h1 class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></h1>
                  <span class="ml-1">Fetching Logs...</span>
              </span>
              <div v-else>
                  <div class="text-2xl" v-if="logs.length === 0">No logs available</div>
                  <div class="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
                      <div v-for="log in logs" :key="log.id">
                      <div
                          class="relative border-[2px] border-white bg-gradient-to-b from-white/50 to-transparent p-5 shadow-[-20px_30px_70px_rgba(219,222,225,0.4)] transition hover:border-secondary/50 hover:bg-secondary/20 dark:border-[rgba(119,128,161,0.15)] dark:bg-black dark:from-transparent dark:shadow-none dark:hover:border-secondary/50 dark:hover:bg-secondary/10 md:p-8"
                      >
                      
                          <h5 class="pt-7 pb-3 text-[22px] font-bold text-black dark:text-white">{{ log.message }}</h5>
                          <p class="text-lg leading-loose line-clamp-3"><span>source IP: </span>{{ log.sourceIP }}</p>
                          <p class="text-lg leading-loose line-clamp-3"><span>destination IP: </span>{{ log.destinationIP }}</p>  
                          <p class="text-xs leading-loose line-clamp-3">{{ new Date(log.timestamp).toLocaleString() }}</p>        
                          <button @click="viewAlerts(log._id)" class="mt-4 py-2 text-secondary dark:text-white">View Alerts</button>
                          <button @click="deleteLog(log._id)" class="mt-4 px-4 py-2 text-secondary dark:text-white">Delete</button>
                      </div>
                  </div>
                  </div>  
              </div>             
          </div>
        </section>

        <div class="-mt-[82px] flex-grow overflow-x-hidden lg:-mt-[42px]">
          <section class="bg-gradient-to-t from-white/[55%] to-transparent py-14 dark:bg-none lg:py-[100px]">
              <div class="container">
                  <div class="relative z-10 lg:flex">
                      <div class="heading text-center ltr:lg:text-left rtl:lg:text-right">
                          <h4 class="lg:text-left">New Log &nbsp;</h4>                                
                          <button @click="fetchRandomLog" :disabled="floading" class="mb-6 px-4 py-2 bg-secondary text-white rounded cursor-pointer" type="submit">
                            <span v-if="floading" class="flex items-center">
                                <h1 class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></h1>
                              <span class="ml-1">Fetching...</span>
                            </span>
                            <span v-else>Fetch Logs</span>
                        </button>                                
                      </div>
                      <form  @submit.prevent="submitLog" class="rounded-3xl bg-white px-4 py-12 dark:bg-gray-dark lg:w-2/3 lg:px-8">
                          <div class="grid gap-10 sm:grid-cols-2">
                              <div class="relative">
                                  <input
                                      type="text"                                      
                                      v-model="newLog.sourceIP"
                                      required
                                      class="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                  />
                                  <label for="" class="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-gray-dark dark:text-white"
                                      >Source IP</label
                                  >
                                 
                              </div>
                              <div class="relative">
                                  <input
                                      type="text"
                                      v-model="newLog.destinationIP"
                                      required
                                      class="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                  />
                                  <label for="" class="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-gray-dark dark:text-white"
                                      >Destination IP</label
                                  >
                                  
                              </div>
                              <div class="relative">
                                  <input
                                      type="text"
                                      name="mobile"
                                      v-model="newLog.action"
                                      required
                                      class="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                  />
                                  <label for="" class="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-gray-dark dark:text-white"
                                      >Action</label
                                  >
                                  
                              </div>
                              <div class="relative">
                                  <input
                                      type="text"
                                      v-model="newLog.protocol"
                                      required
                                      class="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                  />
                                  <label for="" class="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-gray-dark dark:text-white"
                                      >Protocol</label
                                  >
                              
                                </div>
                          </div>                         
                          <div class="relative mt-10">
                              <input
                                  type="text"
                                  v-model="newLog.message"
                                  required
                                  class="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                              />
                              <label for="" class="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-gray-dark dark:text-white"
                                  >Message</label
                              >
                            
                          </div>
                          <div class="mt-10 text-center ltr:lg:text-right rtl:lg:text-left">
                              <button type="submit"  class="btn bg-gray px-12 capitalize text-white dark:bg-white dark:text-black dark:hover:bg-secondary">
                                <span v-if="sloading" class="flex items-center">
                                  <h1 class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></h1>
                                <span class="ml-1">Saving...</span>
                              </span>
                              <span v-else>Submit</span>
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </section>

          <!-- Alerts Modal -->
          <div v-if="selectedLogAlerts.length > 0" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-2xl font-bold mb-4">Alerts</h2>
              <div v-for="alert in selectedLogAlerts" :key="alert._id" class="mb-4">
                <h3 class="text-xl font-semibold">{{ alert.message }}</h3>
                <p><span>source IP: </span>{{ alert.sourceIP }}</p>
                <p><span>destination IP: </span>{{ alert.destinationIP }}</p>  
                <p><strong>Severity:</strong> {{ alert.severity }}</p>
                <p><strong>Type:</strong> {{ alert.type }}</p>
              </div>
              <button @click="selectedLogAlerts = []" class="mt-4 px-4 py-2 bg-secondary text-white rounded">Close</button>
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
        logs: [],
        loading: false,
          newLog: {
          sourceIP: '',
          destinationIP: '',
          protocol: '',
          action: '',
          message: ''
        },
        floading: false,    
        sloading: false,
        selectedLogAlerts: [],   
      };
    },
    methods: {
      async fetchRandomLog() {
        try {
          this.floading = true;
          const response = await axios.get('https://api.mockaroo.com/api/generate.json?key=c9c7c280&count=1&schema=network');          
          if (response.data) {
          const randomLog = response.data;
          this.newLog.sourceIP = randomLog.sourceIP || '';
          this.newLog.destinationIP = randomLog.destinationIP || '';
          this.newLog.protocol = randomLog.protocol || '';
          this.newLog.action = randomLog.action || '';
          this.newLog.message = randomLog.message || '';
        } else {
          console.error('Invalid response data:', response.data);
        }
        } catch (error) {
          console.error('Error fetching random log:', error);
        } finally {
          this.floading = false;
        }
      },

      async submitLog() {
        try {
          this.sloading = true;
          const token = localStorage.getItem('token');
          await axios.post('https://ids-api-lgwc.onrender.com/api/logs', this.newLog, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.$toast.info('Log added successfully. Check the Alerts and Responses Page for the Log', { timeout: 11000 });
          this.fetchLogs(); 
          this.resetForm();
        } catch (error) {
          this.$toast.error('Failed to add log', { timeout: 11000 });
          console.error(error);
        } finally {
          this.sloading = false;
        }
      },

      async viewAlerts(logId) {
          try {
              const token = localStorage.getItem('token');
              const response = await axios.get(`https://ids-api-lgwc.onrender.com/api/alerts/${logId}`, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              this.selectedLogAlerts = response.data;
          } catch (error) {
              console.error('Error fetching alerts:', error);
              const errorMessage = error.response && error.response.data && error.response.data.message
                  ? error.response.data.message
                  : 'An unexpected error occurred';
              this.$toast.info(errorMessage, { timeout: 11000 });
          }
      },

      async fetchLogs() {
        try {
          this.loading = true;
          const token = localStorage.getItem('token');
          const response = await axios.get('https://ids-api-lgwc.onrender.com/api/logs', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });         
          this.logs = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } catch (error) {
          console.error('Error fetching logs:', error);
              const errorMessage = error.response && error.response.data && error.response.data.message
                  ? error.response.data.message
                  : 'An unexpected error occurred';
              this.$toast.info(errorMessage, { timeout: 11000 });
        } finally {
          this.loading = false;
        }
      },

    
      async deleteLog(id) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`https://ids-api-lgwc.onrender.com/api/logs/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.$toast.info('Deleted successfully!!', {
                  timeout: 5000, 
          });
          this.fetchLogs();
        } catch (error) {
          console.error('Error deleting log:', error);
          this.$toast.error('An error occured. Please try again!!!', {
              timeout: 5000, 
          });
        }
      },

      resetForm() {
        this.newLog = {
          sourceIP: '',
          destinationIP: '',
          protocol: '',
          action: '',
          message: ''
        };
      },
    },
    mounted() {
      this.fetchLogs();
    }
  };
  </script>
  
  <style scoped>
  .loader {
    border-top-color: #3498db;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  