<template>
  <div class="h-[400px] w-[800px] rounded-md shadow p-[20px] m-4">
    <h1><Strong>Revenue</Strong></h1>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const data = {
  labels: labels,
  datasets: [{
    label: 'Total revenue',
    data: [65, 59, 80, 81, 56, 55, 40, 100, 60, 80, 67, 12],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
    ],
    borderColor: [
      'rgb(255, 99, 132)',
    ],
    borderWidth: 1
  }]
};
const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

onMounted(() => {
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, config);
});
</script>
