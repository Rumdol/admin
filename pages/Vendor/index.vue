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
const { getPendingVendor, vendorApprove, vendorReject } = vendorStore;
const vendorList = ref([]);
const currentPage = ref(1);
const totalVendorRequest = ref(0);
const searchTerm = ref(''); //Ref for the search input


// Fetch vendor requests
const fetchVendorRequest = async () => {
  try {
    const response = await getPendingVendor({ page: currentPage.value, search: searchTerm.value.trim() });
    const { vendorRequest, total } = response || {};
    vendorRequest.data = vendorRequest.data.filter(vendor => vendor.status !== 'active')
    vendorList.value = vendorRequest?.data || [];
    totalVendorRequest.value = total || 0;
  } catch (error) {
    console.error('Failed to fetch vendor request', error);
  }
};

// Handle page change
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  fetchVendorRequest();
};




// Handle approve confirmation
const handleApprove = async (id) => {
  try {
    // Call the store function to delete the category
    await vendorApprove(id)
    ElMessage.success('Approving successfully')
    // Refresh the table data
    await fetchVendorRequest();
  } catch (error) {
    ElMessage.error('Failed to approving: ' + error.message)
    console.error('Failed to approving:', error)
  }
}
const confirmApprove = async (id) => {
  try {
    // Show confirmation dialog
    await ElMessageBox.confirm(
      'Are you sure you want to approve this vendor?',
      'Approve',
      {
        confirmButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    )
    // If confirmed, call the approved handler with the passed ID
    await handleApprove(id)
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Error while confirming approve: ' + error.message)
      console.error('Error while confirming approve:', error)
    } else {
      ElMessage.info('Vendor Approving cancelled')
    }
  }
}

// Handle reject confirmation
const handleReject = async (id) => {
  try {
    // Call the store function to delete the category
    await vendorReject(id)
    ElMessage.success('Rejected successfully')
    // Refresh the table data
    await fetchVendorRequest();
  } catch (error) {
    ElMessage.error('Failed to Rejected: ' + error.message)
    console.error('Failed to Rejected:', error)
  }
}
const confirmReject = async (id) => {
  try {
    // Show confirmation dialog
    await ElMessageBox.confirm(
      'Are you sure you want to reject this vendor?',
      'Approve',
      {
        confirmButtonText: 'Reject',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    )
    // If confirmed, call the approved handler with the passed ID
    await handleReject(id)
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Error while confirming reject: ' + error.message)
      console.error('Error while confirming reject:', error)
    } else {
      ElMessage.info('Vendor reject cancelled')
    }
  }
}

// Handle search (debounced)
const searchHandler = debounce(async () => {
  currentPage.value = 1; // Reset to the first page on search
  await fetchVendorRequest();
}, 500);

// Trigger search when the button is clicked
const handleSearch = async () => {
  await searchHandler();
}
// Fetch data on component mount
onMounted(() => {
  fetchVendorRequest();
});
</script>

<template>
  <div class="flex flex-col p-4">
    <!-- Section 1 -->
    <div class="pb-4 mb-4">
      <h1 class="text-3xl font-semibold">Vendor Request</h1>
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
            <el-button @click="navigateTo('vendor/view/' + scope.row.id)">
              <i class="fa-solid fa-eye"></i>
            </el-button>
            <el-button v-if="scope.row.status !== 'active'" @click="confirmApprove(scope.row.id)" type="success" class="bg-emerald-600">
              <i class="fa-solid fa-check "></i>
            </el-button>
            <el-button v-if="scope.row.status !== 'active'" @click="confirmReject(scope.row.id)" type="danger">
              <i class="fa-solid fa-xmark"></i>
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

