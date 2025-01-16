<script setup>
import { ref } from 'vue'
import { useCategoryStore } from '~/store/category.js'
import { useDebounce } from '~/composables/useDebounce.js'
definePageMeta({
  middleware: ['authenticated'],
})
const value = ref('')

//use the category store
const categoryStore = useCategoryStore()

const tableData = ref([])
const multipleTableRef = ref(null)
const totalItems = ref(0) // Total items count
const currentPage = ref(1) // Current page
const perPage = ref(5) // Items per page (default from API)
const lastPage = ref(1) // Last page number
const searchTerm = ref('') // Ref for the search input
const { debounce } = useDebounce()
// Debounced search handler

// Fetch categories for the table
const fetchCategories = async () => {
  try {
    const response = await categoryStore.getCategory({
      page: currentPage.value,
      search: searchTerm.value,
    })

    const { categories, total, per_page, last_page } = response
    tableData.value = categories.data || []
    totalItems.value = total || 0
    perPage.value = per_page || 5
    lastPage.value = last_page || 1
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

// Handle page change
const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= lastPage.value) {
    currentPage.value = newPage
    fetchCategories()
  }
}

// Handle deletion
const handleDelete = async (id) => {
  try {
    // Call the store function to delete the category
    await categoryStore.deleteCategory(id)
    ElMessage.success('Category deleted successfully')
    // Refresh the table data
    await fetchCategories()
  } catch (error) {
    ElMessage.error('Failed to delete category: ' + error.message)
    console.error('Failed to delete category:', error)
  }
}

// Handle delete confirmation
const confirmDelete = async (id) => {
  try {
    // Show confirmation dialog
    await ElMessageBox.confirm(
      'Are you sure you want to delete this category?',
      'Delete Category',
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    )
    // If confirmed, call the delete handler with the passed ID
    await handleDelete(id)
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Error while confirming delete: ' + error.message)
      console.error('Error while confirming delete:', error)
    } else {
      ElMessage.info('Category deletion cancelled')
    }
  }
}
const onPageChange = (page) => {
  currentPage.value = page;
  fetchCategories();
}
// Handle search (debounced)
const searchHandler = debounce(async () => {
  currentPage.value = 1 // Reset to the first page on search
  await fetchCategories()
}, 500)

// Trigger search when the button is clicked
const handleSearch = async () => {
  await searchHandler()
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div class="flex flex-col p-4">
    <!--Section 1-->
    <div class="pb-4 mb-4">
      <ul class="flex w-full justify-between items-center">
        <li class="text-3xl font-semibold">Category</li>
        <li>
          <button
            class="px-4 py-4 mr-[50px] bg-primary text-white rounded-md opacity-100 hover:bg-opacity-50 active:bg-opacity-30"
            @click="navigateTo('/category/create')"
          >
            Create Category
          </button>
        </li>
      </ul>
    </div>

    <!Search-->
    <div class="bp-4 mb-4 w-full">
      <ul class="flex flex-row justify-start items-center">
        <li>
          <el-input
            v-model="searchTerm"
            @input="handleSearch"
            placeholder="Search category"
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

    <!--Section table-->
    <div class="table">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :selectable="selectable" width="50" />
        <el-table-column prop="id" label="ID" width="300" />
        <el-table-column prop="icon" label="Icon" width="300">
          <template #default="scope">
            <img :src="scope.row.icon" alt="Icon" style="max-width: 100px; max-height: 100px;">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name" width="300" />
        <el-table-column prop="parent" label="Parent" width="300" />
        <el-table-column prop="action" label="Action" width="200">
          <template #default="scope">
            <el-button @click="navigateTo('/category/edit/' + scope.row.id)">
              <i class="fa-solid fa-pen"></i>
            </el-button>
            <el-button @click="confirmDelete(scope.row.id)">
              <i class="fa-solid fa-trash"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--Pagination-->
    <div class="pr-[50px] pt-[10px] mb-4 justify-center justify-items-end">
      <!-- Pagination -->
      <el-pagination
        v-model:currentPage="currentPage"
        :page-size="perPage"
        :total="totalItems"
        layout="prev, pager, next, total"
        @current-change="onPageChange"
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
  width: 1500px;
}
</style>
