import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
        commit('setToken', response.data.token);
        commit('setUser', response.data.user);
      } catch (error) {
        console.error('Login failed', error);
      }
    },
    async register({ commit }, userDetails) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', userDetails);
        commit('setToken', response.data.token);
        commit('setUser', response.data.user);
      } catch (error) {
        console.error('Registration failed', error);
      }
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setToken', null);
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => state.user,
  },
});
