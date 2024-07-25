<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white dark:bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
        <h2 class="text-2xl mb-4">Add New Log</h2>
        <form @submit.prevent="submitLog">
          <div class="mb-4">
            <label for="sourceIP" class="block text-gray-700 dark:text-gray-300">Source IP</label>
            <input v-model="log.sourceIP" type="text" id="sourceIP" class="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
          </div>
          <div class="mb-4">
            <label for="destinationIP" class="block text-gray-700 dark:text-gray-300">Destination IP</label>
            <input v-model="log.destinationIP" type="text" id="destinationIP" class="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
          </div>
          <div class="mb-4">
            <label for="protocol" class="block text-gray-700 dark:text-gray-300">Protocol</label>
            <input v-model="log.protocol" type="text" id="protocol" class="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
          </div>
          <div class="mb-4">
            <label for="action" class="block text-gray-700 dark:text-gray-300">Action</label>
            <input v-model="log.action" type="text" id="action" class="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
          </div>
          <div class="mb-4">
            <label for="message" class="block text-gray-700 dark:text-gray-300">Message</label>
            <input v-model="log.message" type="text" id="message" class="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-secondary text-white rounded">Add Log</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean
    },
    data() {
      return {
        log: {
          sourceIP: '',
          destinationIP: '',
          protocol: '',
          action: '',
          message: ''
        }
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      submitLog() {
        this.$emit('add-log', this.log);
        this.closeModal();
      }
    }
  };
  </script>
  