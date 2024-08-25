<!-- src/components/PresentationScreen.vue -->
<template>
    <div class="presentation-screen">
      <h1>Bem-vindo à Análise de Água</h1>
      <p>Prepare-se para iniciar a análise completa da qualidade da água.</p>
      <button @click="startApplication">Iniciar Aplicação</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PresentationScreen',
    methods: {
        startApplication() {
        this.$emit('start');
      }
    }
  };
  </script>
  
  <style scoped>
  .presentation-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #f0f0f0;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #333;
  }
  
  p {
    margin: 20px 0;
    font-size: 1.2rem;
    color: #666;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  