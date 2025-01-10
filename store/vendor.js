import { defineStore } from 'pinia'
import VendorService from '~/services/VendorService.js'
import { ref, computed } from 'vue'


export const useVendorStore = defineStore('vendor', () => {
  const vendorRequest = ref([])
  const vendorService = VendorService.getInstance()
  const vendorDetail = ref({})

  const getVendor = async (params) => {
    try {
      const { data } = await vendorService.getVendor(params)
      const total = data?.total || 0;
      vendorRequest.value = data || {};
      return {vendorRequest:vendorRequest.value, total}
    } catch (error) {
      ElMessage.error(error.message || 'Get vendor request failed')
      throw new Error(`Vendor request failed: ${error.message || 'Unknown error'}`)
    }
  }

  const getVendorDetail = async (id) => {
    try {
      const { data } = await vendorService.getVendorDetail(id);
      vendorDetail.value = data || {};
      return vendorDetail.value;
    } catch (error) {
      ElMessage.error(error.message || 'Get vendor detail failed');
      throw new Error(`Vendor detail failed: ${error.message || 'Unknown error'}`);
    }
  };

  const vendorApprove = async (params) => {
    try {
      // Call the vendorApprove function from the service
      const vendorApprove = await vendorService.vendorApprove(params)
      ElMessage.success('Vendor approve successfully')

      return vendorApprove  // Return vendorApprove data
    } catch (error) {
      throw new Error('Failed to approving in store: ' + error.message)
    }
  }
  const vendorReject = async (params) => {
    try {
      // Call the vendorApprove function from the service
      const vendorReject = await vendorService.vendorReject(params)
      ElMessage.success('Vendor reject successfully')

      return vendorReject  // Return vendorApprove data
    } catch (error) {
      throw new Error('Failed to reject in store: ' + error.message)
    }
  }


  return {
    vendorRequest : computed(() => vendorRequest.value),
    vendorDetail : computed(() => vendorDetail.value),
    getVendor,
    getVendorDetail,
    vendorApprove,
    vendorReject,
  }
})
