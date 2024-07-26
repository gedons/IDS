<template>
    <div>
      <!-- <h2>Historical Data Analysis</h2>
      <input type="date" v-model="startDate" />
      <input type="date" v-model="endDate" />
      <button @click="fetchHistoricalData">Fetch Data</button>
      
      <div v-if="actionCounts">
        <h3>Action Counts</h3>
        <ul>
          <li v-for="(count, action) in actionCounts" :key="action">
            {{ action }}: {{ count }}
          </li>
        </ul>
      </div>
      
      <div v-if="trendData">
        <h3>Daily Trend Analysis</h3>
        <Line :data="trendChartData" :options="chartOptions" />
      </div>
      
      <div v-if="aggregatedData">
        <h3>Aggregated Data</h3>
        <p><strong>Total Logs:</strong> {{ aggregatedData.totalLogs }}</p>
        <p><strong>Average Actions Per Day:</strong> {{ aggregatedData.averageActionsPerDay.toFixed(2) }}</p>
      </div> -->

      <section class="bg-gradient-to-t from-white/50 to-transparent py-14 dark:from-white/[0.02] md:py-20">
        <div class="container">
          <div class="mb-10">
            <h6 class="mb-4 text-lg font-extrabold uppercase text-secondary">Historic Data</h6>
            <h2 class="text-3xl font-black leading-tight text-black dark:text-white md:text-[40px]">Log Analysis</h2>
          </div>

          <div class="rounded-3xl bg-white px-4 py-12 dark:bg-gray-dark">
            <div class="grid gap-10 sm:grid-cols-2">
                <div class="relative">
                    <input
                        type="date" v-model="startDate"
                        required
                        class="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                    />
                    <label for="" class="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-gray-dark dark:text-white"
                        >Start Date</label
                    >
                   
                </div>
                <div class="relative">
                    <input
                        type="date" v-model="endDate"
                        required
                        class="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                    />
                    <label for="" class="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-gray-dark dark:text-white"
                        >End Date</label
                    >
                    
                </div>                             
            </div>                         
            
            <div class="mt-10 text-center ltr:lg:text-right rtl:lg:text-left">
                <button @click="fetchHistoricalData" class="btn bg-gray px-12 capitalize text-white dark:bg-white dark:text-black dark:hover:bg-secondary">
                  <span v-if="loading" class="flex items-center">
                    <h1 class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></h1>
                  <span class="ml-1">Fetching...</span>
                </span>
                <span v-else>Fetch Data</span>
                </button>
            </div>  
            <div class="p-6">
                <div v-if="actionCounts">
                    <h3 class="mb-4 text-2xl font-bold">Action Counts</h3>
                    <ul>
                      <li v-for="(count, action) in actionCounts" :key="action">                           
                        <p><strong> {{ action }}:</strong>  {{ count }}</p>
                      </li>
                    </ul>
                </div>

                <div v-if="trendData">
                    <h3>Daily Trend Analysis</h3>
                    <Line :data="trendChartData" :options="chartOptions" />
                </div>

                <div v-if="aggregatedData">
                    <h3>Aggregated Data</h3>
                    <p><strong>Total Logs:</strong> {{ aggregatedData.totalLogs }}</p>
                    <p><strong>Average Actions Per Day:</strong> {{ aggregatedData.averageActionsPerDay.toFixed(2) }}</p>
                </div> 
            </div> 
           
            </div>                
        </div>
      </section>     
    </div>

  </template>
  
  <script>
  import axios from 'axios';
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);
  
  export default {
    components: {
      Line
    },
    data() {
      return {
        startDate: '',
        endDate: '',
        actionCounts: null,
        trendData: null,
        loading: false,
        aggregatedData: null,
        trendChartData: {
          labels: [],
          datasets: [{
            label: 'Number of Logs',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: []
          }]
        },
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `Log Count: ${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Number of Logs'
              }
            }
          }
        }
      };
    },
    methods: {
      async fetchHistoricalData() {
        this.loading = true;
        try {          
          const token = localStorage.getItem('token');
          const response = await axios.get('https://ids-api-lgwc.onrender.com/api/logs/historical-data', {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              startDate: this.startDate,
              endDate: this.endDate
            }
          });
          this.$toast.info('Fetched successfully!!', {
                  timeout: 5000, 
          });
  
          this.actionCounts = response.data.actionCounts;
          this.trendData = response.data.trendData;
          this.aggregatedData = response.data;
  
          // Prepare data for the trend chart
          this.trendChartData.labels = Object.keys(this.trendData);
          this.trendChartData.datasets[0].data = Object.values(this.trendData);
        } catch (error) {
          console.error('Error fetching historical data:', error);
        }finally{
            this.loading = false;
        }
      }
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
  