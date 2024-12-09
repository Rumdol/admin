<script setup>
import { ref } from 'vue';
import { navigateTo } from '#imports'

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

const fetchCategories = async () => {
  try{
   // const response = await axios.get('/api/catgories');
   // tableData.value = response.data;
  }catch(error){
    console.log('Failed to fetch categories',error)
  }
}
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const handleEdit = (row) => {
  console.log('Edit', row); // Add your edit logic here
};
const handleDelete = (row) => {
  try{
    //await axios.delete(`/api/catgories/${row.id}`);
    console.log('Delete',row);
    fetchCategories();
  }catch(error){
    console.log('Failed to delete category',error);
  }
};

onMounted(fetchCategories);
</script>


<template>
  <div class="flex flex-col max-w-full ">
    <!--Section 1-->
    <div class="pb-4 mb-4">
      <ul class="flex  w-full justify-between items-center ">
        <li class="text-3xl font-semibold">
          Category
        </li>
        <li>
          <button
            class="px-4 py-4 mr-[10px] bg-primary text-white rounded-md opacity-100 hover:bg-opacity-50 active:bg-opacity-30"
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
      <div>
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          class="max-w-lg"

          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" :selectable="selectable" width="50" />
          <el-table-column prop="id" label="ID" width="140" />
          <el-table-column prop="name" label="Name" width="400" />
          <el-table-column prop="position" label="Position" width="400" />
          <el-table-column prop="visible" label="Visible Menu" width="300" />
          <el-table-column prop="action" label="Action" width="300" >
            <template #default="scope">
              <el-button
                @click="heandleEdit(scope.row)"
              >
                <i class="fa-solid fa-pen"></i>
              </el-button>
              <el-button
                @click="heandleEdit(scope.row)"
              >
                <i class="fa-solid fa-trash"></i>
              </el-button>
            </template>
          </el-table-column>

        </el-table>
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
</style>
