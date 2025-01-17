<template>
  <div class="p-4">
    <div class="total-list flex flex-wrap gap-6">
      <ul class="flex flex-wrap gap-6 ml-2">
        <li>
          <TotalUser :total="dashboardStore.dashboard.total_users"/>
        </li>
        <li>
          <TotalVendors :total="dashboardStore.dashboard.total_vendors"/>
        </li>
        <li>
          <TotalProducts :total="dashboardStore.dashboard.total_products"/>
        </li>
        <li>
          <TotalRevenue :total="dashboardStore.dashboard.total_revenue"/>
        </li>
      </ul>
    </div>
    <div class="flex flex-wrap gap-3 mt-4">
      <TotalSaleCharts v-if="dashboardStore.dashboard.revenue_per_month" :revenue="dashboardStore.dashboard.revenue_per_month"/>
      <TotalTopPrduct v-if="dashboardStore.dashboard.top_products" :data="dashboardStore.dashboard.top_products"/>
    </div>
    <div class="mt-4 flex justify-end">
      <el-button type="primary" @click="calculateSubscription">Calculate Subscription</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useDashboardStore } from '~/store/dashboard.js';
import { ElMessage, ElButton } from 'element-plus';

useSeoMeta({
  titleTemplate: (title) => (title ? `${title} - Rumdul` : 'Rumdul'),
});
definePageMeta({
  middleware: ['authenticated'],
});

//init the store
const dashboardStore = useDashboardStore();

const fetchDashboard = async () => {
  try{
    await dashboardStore.getDashboard();
    console.log('Dashboard data loaded successfully.');
  }catch(error){
    console.log('Failed to fetch dashboardData',error);
  }
}

//calculateSubscription from api
const calculateSubscription = async () => {
  try {
    await dashboardStore.calculateSubscription();
    await fetchDashboard();
    ElMessage.success('Subscription data added successfully.');
  } catch (error) {
    console.error('Failed to calculate subscription:', error);
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchDashboard();
});
</script>

<style scoped>
:root {
  font-family: Inter, sans-serif;
}
</style>
