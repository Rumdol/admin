<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '~/store/category';
import { ElMessage } from 'element-plus';

// Get route and router instances
const route = useRoute();

// Get the category store
const categoryStore = useCategoryStore();

// Form data
const formValidate = ref({
  name: '',
  parent: '',
  iconList: [],
  description: '',
  status: false,
});

// Form reference
const formRef = ref(null);

// Load category data by ID
const loadCategory = async () => {
  try {
    const id = route.params.id; // Get ID from route params
    const category = await categoryStore.updateCategory(id);
    formValidate.value = {
      name: category.name || '',
      parent: category.parent || '',
      iconList: category.icon ? [{ name: category.icon, url: category.icon }] : [],
      description: category.description || '',
      status: category.status || false,
    };
  } catch (error) {
    ElMessage.error('Failed to load category: ' + error.message);
    navigateTo('/category'); // Navigate back on error
  }
};

// Handle upload success
const handleUploadSuccess = (response, file) => {
  formValidate.value.iconList = [{ name: file.name, url: response.url }];
};

// Handle removing uploaded icon
const handleRemove = () => {
  formValidate.value.iconList = [];
};

// Handle form submission for updating
const onSubmit = async () => {
  try {
    const id = route.params.id; // Get ID from route params
    const updatedData = {
      ...formValidate.value,
      icon: formValidate.value.iconList[0]?.url || null,
    };
    await categoryStore.updateCategory(id, updatedData);
    ElMessage.success('Category updated successfully!');
    navigateTo('/category'); // Navigate back to category list
  } catch (error) {
    ElMessage.error('Failed to update category: ' + error.message);
  }
};

// Fetch data on component mount
onMounted(() => {
  loadCategory();
});
</script>

<template>
  <div class="update-category-form">
    <div class="text-3xl mb-4">
      <strong>
        Update Category
      </strong>
    </div>
    <div>
      <el-form
        ref="formRef"
        :model="formValidate"
        label-width="auto"
        class="max-w-lg justify-center items-center"
      >
        <el-form-item label="Name" required prop="name">
          <el-input v-model="formValidate.name" text="text" />
        </el-form-item>
        <el-form-item label="Parent" required prop="parent">
          <el-input v-model="formValidate.parent" />
        </el-form-item>

        <!-- Icon Upload -->
        <el-form-item label="Icon" required prop="iconList">
          <el-upload
            list-type="picture-card"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
            :file-list="formValidate.iconList"
            :limit="1"
            accept="image/jpeg"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model.text="formValidate.description" type="textarea" />
        </el-form-item>

        <el-form-item label="Visible in Menu" prop="status">
          <el-switch v-model="formValidate.status" />
        </el-form-item>
        <el-form-item class="flex justify-between items-center ml-80">
          <el-button @click="navigateTo('/category')">Cancel</el-button>
          <el-button type="primary" @click="onSubmit" class="update-button active:bg-opacity-50">Save Changes</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.update-category-form {
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 2em;
  margin-top: 5%;
  margin-left: 25%;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 700px;
  height: 700px;
}

.update-button {
  background-color: #00b69b;
  border: none;
  :hover {
    opacity: 0.5;
  }
  :active {
    opacity: 0.8;
  }
}
</style>
