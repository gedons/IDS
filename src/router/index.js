import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Index.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import Logs from '../views/dashboard/Logs.vue';
import Alerts from '../views/dashboard/Alerts.vue';
import IbmResponses from '../views/dashboard/IbmResponses.vue';
import HistoricalData from '../views/dashboard/HistoricalData.vue';
import RealTimeMonitoring from '../views/dashboard/RealTimeMonitoring.vue';



const routes = [
  { path: '/', component: Home },
  { path: '/app/signup', component: Register },
  { path: '/app/signin', component: Login },
  { path: '/app/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true },
    children: [
      {
        path: 'logs',
        component: Logs
      },
      {
        path: 'alerts',
        component: Alerts
      },
      {
        path: 'ibm-responses',
        component: IbmResponses
      },
      {
        path: 'historic-data',
        component: HistoricalData
      },
      {
        path: 'realtime-monitoring',
        component: RealTimeMonitoring
      }
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!localStorage.getItem('token');

  if (requiresAuth && !isAuthenticated) {
    next('/app/signin');
  } else {
    next();
  }
});



export default router;
