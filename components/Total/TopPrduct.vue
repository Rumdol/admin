<script setup>
import { ref, computed, onMounted } from "vue";
const tableData = ref([])
const multipleTableRef = ref(null);

const fetchProducts = async () => {
  try{

  }catch(error){
    console.log('Failed to fetch dashboardData',error);
  }
}
onMounted(fetchProducts);
</script>

<template>
  <div class="flex-row rounded-md border w-[700px] h-[400px] p-[20px] m-4">
    <div class="font-bold text-xl">
      Top Product
    </div>
    <div>
      <el-table
        ref="multipleTableRef"
        class="max-w-lg"
      >
        <el-table-column prop="name" label="Product Name" width="250" />
        <el-table-column prop="category" label="Category" width="250" />
        <el-table-column prop="size" label="Size" width="200" />
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
