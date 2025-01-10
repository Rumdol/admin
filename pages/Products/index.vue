<script setup>
import {ref, onMounted} from 'vue'
import { useProductStore} from '~/store/product.js'
import {useDebounce} from '~/composables/useDebounce.js';

const products = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const searchTerm = ref('');
const itemsPage = ref(5);
const productStore = useProductStore();
const { getProduct } = productStore;

//for search debounce
const { debounce } = useDebounce()

const fetchProduct = async () => {
  try{
    const params = {
      title: searchTerm.value,
      page: currentPage.value,
      search: searchTerm.value,
      per_page: itemsPage.value,
    }
    const data = await getProduct(params);
    products.value = data?.data || [];
    totalItems.value = data?.total || 0;
  }catch(error){
    console.log('Failed to fetch Product', error);
  }
}

// Handle search (debounced)
const searchHandler = debounce(async () => {
  currentPage.value = 1; // Reset to the first page on search
  await fetchProduct();
}, 500);

// Trigger search when the button is clicked
const handleSearch = async () => {
  await searchHandler();
}

const onPageChange = (page) => {
  currentPage.value = page;
  fetchProduct();
}
onMounted(fetchProduct);

</script>

<template>
  <div>
    <h1 class="text-3xl mb-4">All Products</h1>
    <div class="flex justify-between align-center items-center">
      <div class="relative w-full max-w-sm">
        <!-- Input Box -->
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search Product by name"
          @input="handleSearch"
          class="w-full p-3 pr-10 border rounded-md focus:outline-none"
        />
        <i
          class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
      </div>
    </div>
    <div class="border border-gray-200 mt-1.5 rounded">
      <el-table :data="products" >
        <el-table-column prop="product_code" label="Product code"  />
        <el-table-column label="Image">
          <template #default="{ row }">
            <el-image :src="row.image" alt="Product Image" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Brand Name" />
        <el-table-column prop="category_id" label="Category" />
        <el-table-column prop="price" label="Price" />
        <el-table-column prop="created_at" label="Date" />
        <el-table-column prop="status" label="Status">
          <template #default="{ row }">
            <span :class="{'text-green-500': row.status === 1, 'text-red-500': row.status === 0}">
              {{ row.status === 1 ? 'In Stock' : 'Out of Stock' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column  label="Action" width="180">
          <template #default="{ row }">
            <el-button @click="navigateTo(`/Products/${row.id}`)">
              <i class="fa-solid fa-eye"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Pagination -->
    <el-pagination
      v-model:currentPage="currentPage"
      :page-size="itemsPage"
      :total="totalItems"
      layout="prev, pager, next"
      @current-change="onPageChange"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
