<script setup>
import { ref, onMounted } from 'vue';
import { useVendorStore } from '~/store/vendor.js';
import { useDebounce } from '~/composables/useDebounce.js'

// Define page metadata
definePageMeta({
  middleware: ['authenticated'],
});

const vendorStore = useVendorStore();
const { debounce } = useDebounce()
const { getVendor } = vendorStore;
const vendorList = ref([]);
const currentPage = ref(1);
const totalVendorRequest = ref(0);
const searchTerm = ref(''); //Ref for the search input


// Fetch vendor requests
const fetchVendorList = async () => {
  try {
    const response = await getVendor({ page: currentPage.value, search: searchTerm.value.trim() });
    const { vendorRequest, total } = response || {};
    vendorList.value = vendorRequest?.data || [];
    totalVendorRequest.value = total || 0;
  } catch (error) {
    console.error('Failed to fetch vendor request', error);
  }
};

// Handle page change
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  fetchVendorList();
};

// Handle search (debounced)
const searchHandler = debounce(async () => {
  currentPage.value = 1; // Reset to the first page on search
  await fetchVendorList();
}, 500);

// Trigger search when the button is clicked
const handleSearch = async () => {
  await searchHandler();
}
// Fetch data on component mount
onMounted(() => {
  fetchVendorList();
});
</script>

<template>
  <div class="flex flex-col p-4">
    <!-- Section 1 -->
    <div class="pb-4 mb-4">
      <h1 class="text-3xl font-semibold">Vendor List</h1>
    </div>

    <!-- Search -->
    <div class="bp-4 mb-4 w-full">
      <ul class="flex flex-row justify-start items-center">
        <li>
          <el-input
            v-model="searchTerm"
            @input="handleSearch"
            placeholder="Search vendor"
            class="h-12 w-52 rounded-md"
          >
            <template #suffix>
              <el-icon>
                <i class="fa-solid fa-magnifying-glass search"></i>
              </el-icon>
            </template>
          </el-input>
        </li>
      </ul>
    </div>

    <!-- Section Table -->
    <div class="table">
      <el-table :data="vendorList" stripe border>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="Name" width="280" />
        <el-table-column prop="created_at" label="Date" width="300" />
        <el-table-column prop="email" label="Email" width="300" />
        <el-table-column prop="address" label="Address" width="300" />
        <el-table-column label="Action" >
          <template #default="scope">
            <el-button @click="navigateTo('vendor-list/view/' + scope.row.id)">
              <i class="fa-solid fa-eye"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Pagination -->
    <div class="pr-[50px] pt-[10px] mb-4 justify-center">
      <el-pagination
        :current-page="currentPage"
        :total="totalVendorRequest"
        @current-change="handlePageChange"
        layout="total, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
:root {
  font-family: Inter, sans-serif;
}
.filter {
  width: 150px;
}
.table {
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  width: 100%;
}
</style>

