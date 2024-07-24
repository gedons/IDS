<template>
    <h1 class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></h1>
  </template>
  
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
  