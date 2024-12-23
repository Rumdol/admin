<template>
  <el-form :model="form" label-width="auto" class="
  w-[1000px] h-auto p-4 justify-center items-center shadow border border-b-blue-200">
    <h1 class="text-3xl">Vendor Detail</h1>
    <el-form-item label="Id">
      <el-input v-model="form.id" disabled />
    </el-form-item>
    <el-form-item label="Date">
      <el-input v-model="form.created_at" disabled />
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model="form.name" disabled/>
    </el-form-item>
    <el-form-item label="Slug">
      <el-input v-model="form.slug" disabled />
    </el-form-item>
    <el-form-item label="Address">
      <el-input v-model="form.address" disabled />
    </el-form-item>
    <el-form-item label="Description">
      <el-input v-model="form.description" class="h-[100px] text-start" disabled/>
    </el-form-item>
    <el-form-item label="Purpose">
      <el-input v-model="form.purpose" disabled />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="form.email" disabled />
    </el-form-item>
    <el-form-item>
      <el-button @click="navigateTo('/vendor')">Close</el-button>
    </el-form-item>
  </el-form>
</template>

<script  setup>
import { ref, onMounted, computed } from 'vue'
import { useVendorStore } from '~/store/vendor.js';

// Define page metadata
definePageMeta({
  middleware: ['authenticated'],
});

// Reactive form object
const form = ref({});
const vendorStore = useVendorStore();
const { getVendorDetail } = vendorStore;
const route = useRoute();


// Fetch item details from API
const fetchVendorDetails = async () => {
  try {
    const vendorId = route.params.id;
    const vendorData = await getVendorDetail(vendorId); // Directly use the returned data

    // Assign the fetched details to the form
    form.value = vendorData || {};
  } catch (error) {
    console.error('Error fetching vendor details:', error);
  }
};

// Call API on component load
onMounted(() => {
  fetchVendorDetails();
});
</script>

