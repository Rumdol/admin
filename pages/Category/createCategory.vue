
<script setup>
import { reactive, ref } from 'vue'
// do not use same name with ref
const formValidate = reactive({
  name: '',
  description: '',
  attribute: '',
  metaTitle: '',
  slug: '',
  status: false,
})
const formRef = ref(null)
const rules= reactive({
  name: [
    {
      required: true, message: 'Please enter a name!', trigger: 'blur'
    }
  ],
  description: [
    {
      required: true, message: 'Please enter a description!', trigger: 'blur'
    }
  ],
  metaTitle: [
    {
      required: true, message: 'Please enter a metaTitle!', trigger: 'blur'
    }
  ],
  slug: [
    {
      required: true, message: 'Please enter slug!', trigger: 'blur'
    }
  ]
});
const onSubmit = () => {
  if(!formRef) return;
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('submit success!')
      alert('Form submitted successfully!');
      navigateTo('/category');
    }else{
      console.log('error submit!');
    }
  })
}
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
        <el-form-item label="Description" required prop="description" >
          <el-input v-model.text="formValidate.description" type="textarea" />
        </el-form-item>
        <el-form-item label="Attribute" prop="attribute" required>
          <el-select v-model="formValidate.attribute" placeholder="please select attribute" required>
            <el-option label="Brand" value="brand" />
            <el-option label="Fragrance" value="fragrance" />
            <el-option label="size" value="size" />
          </el-select>
        </el-form-item>
        <el-form-item label="Meta title" required prop="metaTitle">
          <el-input v-model="formValidate.metaTitle" />
        </el-form-item>
        <el-form-item label="slug" required prop="slug">
          <el-input v-model="formValidate.slug" />
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
  padding: 1em;
  margin-top: 5%;
  margin-left: 25%;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
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
