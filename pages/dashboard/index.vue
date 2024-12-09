<template>
  <div class="dashboard-container ">
    <div class="total-list flex ">
      <ul class="flex gap-[60px] ml-[5px]">
        <li>
          <TotalUser :total="totalUser"/>
        </li>
        <li>
          <TotalVendors :total="totalVendors"/>
        </li>
        <li>
          <TotalProducts :total="totalProduct"/>
        </li>
        <li>
          <TotalRevenue :total="totalRevenue"/>
        </li>
      </ul>
    </div>
    <div class="flex gap-3">
      <TotalSaleCharts/>
      <TotalTopPrduct/>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted } from 'vue';

useSeoMeta({
  titleTemplate: (title) => {
    return title ? `${title} - Rumdul` : 'Rumdul'
  },
})

const totalUser = ref(0);
const totalVendors = ref(0);
const totalProduct = ref(0);
const totalRevenue = ref(0);
const salesChart = ref([]);
const topProducts = ref([]);

const fetchDashboardData = async () => {
  try{
    console.log('Total')
  }catch(error){
    console.log('Failed to fetch dashboardData',error);
  }
}
</script>
<style scoped>
:root{
  font-family: Inter, sans-serif;
}
</style>
