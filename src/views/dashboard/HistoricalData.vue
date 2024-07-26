<!-- src/components/HistoricalData.vue -->
<template>
    <!-- <div v-if="loading" class="screen_loader fixed inset-0 z-[60] grid place-content-center bg-[#fafafa] dark:bg-[#060818]">
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
    </div> -->
    <div>
      <h2>Historical Data Analysis</h2>
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
      </div>
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
          const response = await axios.get('http://localhost:5000/api/logs/historical-data', {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              startDate: this.startDate,
              endDate: this.endDate
            }
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
  /* Add any necessary styles here */
  </style>
  