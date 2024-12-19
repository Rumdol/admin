
<script setup>
import { reactive, ref } from 'vue'
import {useCategoryStore} from '~/store/category.js'
import { useRoute } from 'vue-router';

const route = useRoute();
const categoryStore = useCategoryStore()
// do not use same name with ref
const formValidate = reactive({
  name: '',
  parent: '',
  iconList: '',
  description: '',
  status: false,
})
const formRef = ref(null)
const rules= reactive({
  name: [
    {
      required: true, message: 'Please enter a name!', trigger: 'blur'
    }
  ],
  parent: [
    {
      required: true, message: 'Please enter a name!', trigger: 'blur'
    }
  ],
  iconList: [
    {
      required: true, message: 'Please enter a metaTitle!', trigger: 'blur'
    }
  ],
  description: [
    {
      required: true, message: 'Please enter a description!', trigger: 'blur'
    }
  ],

});
// Handle successful image upload
const handleUploadSuccess = (response, file, fileList) => {
  formValidate.iconList = [file]; // Store the uploaded file
  console.log('Uploaded file:', response); // Process server response if needed
};

// Handle file removal
const handleRemove = (file, fileList) => {
  formValidate.iconList = []; // Clear the file list when the file is removed
};

// Submit the form
const onSubmit = async () => {
  if (!formRef.value) return;

  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // Form data including the image URL
        const formData = {
          name: formValidate.name,
          parent: formValidate.parent,
          icon: formValidate.iconList.length > 0 ? formValidate.iconList.url : '', // Icon URL
          description: formValidate.description,
          status: formValidate.status,
        };

        // Create category using the service
        await categoryStore.createCategory(formData);
        console.log(formData);
        console.log('Category created successfully!');
        navigateTo('/category'); // Navigate back to the category page
      } catch (error) {
        console.error('Failed to create category:', error.message);
      }
    } else {
      console.log('Error during form validation!');
    }
  });
};


</script>


<template>
  <div class="create-category-form">
    <div class="text-3xl mb-4 ">
      <strong>
        Create Category
      </strong>
    </div>
    <div >
      <el-form
          ref="formRef"
        :model="formValidate"
        label-width="auto"
        class="max-w-lg justify-center items-center" >
        <el-form-item label="Name" required prop="name">
          <el-input
            v-model="formValidate.name"
            text="text"
          />
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
        <el-form-item label="Description" prop="description" >
          <el-input v-model.text="formValidate.description" type="textarea" />
        </el-form-item>

        <el-form-item label="Visible in Menu" prop="status">
          <el-switch v-model="formValidate.status" />
        </el-form-item>
        <el-form-item class="flex justify-between items-center ml-80">
          <el-button @click="navigateTo('/category')">Cancel</el-button>
          <el-button  type="primary" @click="onSubmit" class="create-button active:bg-opacity-50">Create</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<style scoped lang="scss">
:root{
  font-family: Inter, sans-serif;
}
.create-category-form{
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
.create-button{
  background-color: #00B69B;
  border: none;
  :hover{
    opacity: 0.5;
  }
  :active{
    opacity: 0.8;
  }
}
</style>
