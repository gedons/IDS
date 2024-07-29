<template>
  <div>
    <section class="bg-gradient-to-t from-white/50 to-transparent py-14 dark:from-white/[0.02] md:py-20">
      <div class="container">
        <div class="mb-10">
          <h6 class="mb-4 text-lg font-extrabold uppercase text-secondary">Real-Time Monitoring</h6>
          <h2 class="text-3xl font-black leading-tight text-black dark:text-white md:text-[40px]">Log Analysis</h2>
        </div>

        <div class="rounded-3xl bg-white px-4 py-12 dark:bg-gray-dark">
          <div class="grid gap-10 sm:grid-cols-2">
              <div class="relative">
                  <input
                      type="datetime-local" v-model="startDate"
                      required
                      class="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                  />
                  <label for="" class="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-gray-dark dark:text-white"
                      >Start Date</label
                  >
                 
              </div>
              <div class="relative">
                  <input
                      type="datetime-local" v-model="endDate"
                      required
                      class="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                  />
                  <label for="" class="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-gray-dark dark:text-white"
                      >End Date</label
                  >
                  
              </div>                             
          </div>                         
          
          <div class="mt-10 text-center ltr:lg:text-right rtl:lg:text-left">
              <button @click="fetchRealTimeData" class="btn bg-gray px-12 capitalize text-white dark:bg-white dark:text-black dark:hover:bg-secondary">
                <span v-if="loading" class="flex items-center">
                  <h1 class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 "></h1>
                <span class="ml-1">Fetching...</span>
              </span>
              <span v-else>Fetch Data</span>
              </button>
          </div>  
          <div class="p-6"  v-if="chartData">
              <div>                  
                  <h3 class="mb-4 text-2xl font-bold">Real-Time Data Chart</h3>
                  <canvas id="realTimeChart" ref="realTimeChart"></canvas>
              </div>

              <h3 class="mt-3">Data Summary</h3>
              <div
              class="relative border-[2px] border-white bg-gradient-to-b from-white/50 to-transparent p-5 shadow-[-20px_30px_70px_rgba(219,222,225,0.4)] transition hover:border-secondary/50 hover:bg-secondary/20 dark:border-[rgba(119,128,161,0.15)] dark:bg-black dark:from-transparent dark:shadow-none dark:hover:border-secondary/50 dark:hover:bg-secondary/10 md:p-8"
               >
                <div>
                  <h4>IP Logs Count</h4>
                  <ul>
                    <li v-for="(ipData, ip) in chartData.ipSummary" :key="ip">
                      {{ ip }}: {{ ipData.count }}
                    </li>
                  </ul>
                </div><br>
                <div>
                  <h4>Alert Summary</h4>
                  <ul>
                    <li v-for="(count, action) in chartData.alertSummary" :key="action">
                      {{ action }}: {{ count }}
                    </li>
                  </ul>
                </div><br>
                <div>
                  <h4>Threat Levels</h4>
                  <ul>
                    <li v-for="(threat, level) in chartData.threatLevels" :key="level">
                      {{ level }}: {{ threat.threatLevel }}
                    </li>
                  </ul>
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
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      chartData: null,
      chartInstance: null,
      loading: false,
    };
  },
  methods: {
    async fetchRealTimeData() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://ids-api-lgwc.onrender.com/api/monitoring/real-time-data', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            startDate: this.startDate,
            endDate: this.endDate
          }
        });

        this.chartData = response.data;
        this.$nextTick(() => {
          this.renderChart();
        });
      } catch (error) {
        console.error('Error fetching real-time data:', error);
      }finally{
            this.loading = false;
        }
    },
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const ctx = this.$refs.realTimeChart.getContext('2d');

      const labels = Object.keys(this.chartData.ipSummary);
      const data = Object.values(this.chartData.ipSummary).map(ipData => ipData.count);
      const actions = Object.keys(this.chartData.alertSummary);
      const actionData = Object.values(this.chartData.alertSummary);
      const threatLabels = Object.keys(this.chartData.threatLevels);
      const threatData = Object.values(this.chartData.threatLevels).map(threat => threat.threatLevel);

      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'IP Logs Count',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Alert Summary',
              data: actionData,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
            },
            {
              label: 'Threat Levels',
              data: threatData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>

<style>
canvas {
  max-width: 100%;
  height: 400px;
}
.data-display {
  margin-top: 20px;
}
.data-display h4 {
  margin-top: 10px;
}
.data-display ul {
  list-style-type: none;
  padding: 0;
}
.data-display ul li {
  margin-bottom: 5px;
}
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
