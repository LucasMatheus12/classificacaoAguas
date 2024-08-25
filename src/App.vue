<!-- src/App.vue -->
<!-- src/App.vue -->
<template>
  <div id="app">
    <PresentationScreen v-if="showPresentation" @start="startApplication" />
    <WaterAnalysisForm v-else />
  </div>
</template>

<script>
import WaterAnalysisForm from './components/WaterAnalysisForm.vue';
import PresentationScreen from './components/PresentationScreen.vue';

export default {
  name: 'App',
  components: {
    WaterAnalysisForm,
    PresentationScreen
  },
  data() {
    return {
      showPresentation: true
    };
  },
  methods: {
    startApplication() {
      this.showPresentation = false;
    }
  }
};
</script>


<style>
 body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        h2 {
            color: #333;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        .question {
            margin-bottom: 10px;
        }

        .param {
            margin-bottom: 10px;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input[type="checkbox"] {
            margin-right: 5px;
        }

        input[type="text"] {
            margin-top: 5px;
            padding: 5px;
            width: 100%;
            /* Ajuste para compensar a largura do padding */
            box-sizing: border-box;
        }

        button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }

        table {
            width: 100%;
            margin-bottom: 20px;
            border-collapse: collapse;
        }

        table,
        th,
        td {
            border: 1px solid #ccc;
        }

        th,
        td {
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .form-group {
            margin-bottom: 15px;
        }

        input[type="checkbox"] {
            margin-right: 5px;
        }
</style>
