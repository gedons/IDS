import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Index.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';



const routes = [
  { path: '/', component: Home },
  { path: '/app/signup', component: Register },
  { path: '/app/signin', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
