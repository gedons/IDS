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
                <h2 class="text-3xl font-black leading-tight text-black dark:text-white md:text-[40px]">List of available network logs</h2>
            </div>
                         
            <button @click="addLog" class="mb-6 px-4 py-2 bg-secondary text-white rounded">Add Log</button>
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
                        <!-- <button @click="viewLog(log.id)" class="mt-4 py-2 text-black dark:text-white">View</button>                   -->
                        <button @click="deleteLog(log._id)" class="mt-4 py-2 text-secondary dark:text-white">Delete</button>
                    </div>
                </div>
                </div>  
            </div>             
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        logs: [],
        loading: false,
      };
    },
    async created() {
      this.loading = true;
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
      }finally{
        this.loading = false;
      }
    }
  };
  </script>
  