<script setup>
import { ref } from 'vue';
import { navigateTo } from '#imports'
import { useCategoryStore } from '~/store/category.js'

const value = ref('')
const brand = [
  {
    label: 'Brand',
  },
  {
    label: 'Size',
  },
  ];
const toggleDropdown = () =>{
  const select = document.querySelector('.el-select');
  const dropdown = select?.querySelector('.el-select-dropdown__wrap');
  if(dropdown){
    select.click();
  }
};
const tableData = ref([]);
const multipleTableRef = ref(null);
const multipleSelection = ref([]);
const totalItems = ref(0); // Track total items for pagination
const currentPage = ref(1); // Current page number
//use the category store
const categoryStore = useCategoryStore();

const fetchCategories = async () => {
  try{
    const {categories, total} = await categoryStore.getCategory(
      {
        page: currentPage.value,
      }
    );
    tableData.value = categories.data || [];
    totalItems.value = total || 0;
    console.log(tableData.value);
  }catch(error){
    console.log('Failed to fetch categories',error)
  }
}

// Handle page change
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  fetchCategories();
};


const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const handleDelete = async (id) => {
  try{
    const deleteCategory = await categoryStore.deleteCategory(id);
    fetchCategories();
  }catch(error){
    console.log('Failed to delete categories',error)
  }
}

onMounted(() => {
  fetchCategories();
})
</script>


<template>
  <div class="flex flex-col p-4">
    <!--Section 1-->
    <div class="pb-4 mb-4">
      <ul class="flex  w-full justify-between items-center ">
        <li class="text-3xl font-semibold">
          Category
        </li>
        <li>
          <button
            class="px-4 py-4  mr-[50px] bg-primary text-white rounded-md opacity-100 hover:bg-opacity-50 active:bg-opacity-30"
            @click="navigateTo('/category/createCategory')"
          >Create Category</button>
        </li>
      </ul>
    </div>

    <!--Section 2-->
    <div class="bp-4 mb-4 w-full">
      <ul class="flex  justify-start items-center ">
        <li>
          <el-input
            placeholder="Search category"
            class="h-12 w-52 rounded-md"
          >
            <template #suffix>
              <el-icon
              >
                <i class="fa-solid fa-magnifying-glass search"></i>
              </el-icon>
            </template>
          </el-input>
        </li>
          <li class="flex items-center p-2">
            <el-select
              v-model="value"
              placeholder="Filter by"
              size="large"
              class="filter">
              <el-option v-for="item in brand" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
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
          <el-table-column prop="name" label="Name" width="300" />
          <el-table-column prop="parent" label="Parent" width="300" />
          <el-table-column prop="visible" label="Visible Menu" width="300" />
          <el-table-column prop="action" label="Action" width="200" >
            <template #default="scope">
              <el-button
                @click="heandleEdit(scope.row)"
              >
                <i class="fa-solid fa-pen"></i>
              </el-button>
              <el-button
                @click="handleDelete(scope.row)"
              >
                <i class="fa-solid fa-trash"></i>
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

    <!--Pagination-->
    <div class="pr-[50px] pt-[10px] mb-4  justify-center justify-items-end ">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalItems"
        @current-change="handlePageChange"
        layout="total,prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
:root{
  font-family: Inter, sans-serif;
}
.filter{
  width: 150px;
}
.table{
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  width: 1500px;

}
</style>
