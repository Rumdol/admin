<script setup>
import { ref, onMounted } from 'vue';
import { useProfileStore } from '~/store/profile.js';
import { ElMessage, ElInput, ElButton } from 'element-plus';

definePageMeta({
  middleware: ['authenticated'],
});

const profileStore = useProfileStore();
const { getProfile, updateProfile } = profileStore;

const profile = ref({
  name: '',
  image: '',
  age: '',
  mobile: '',
});

const file = ref(null); // Store selected file
const isEditing = ref(false); // State to toggle editing mode

const fetchProfile = async () => {
  try {
    const response = await getProfile();
    profile.value = response || {};
    file.value = null; // Reset file input
  } catch (error) {
    ElMessage.error('Failed to fetch profile');
    console.error('Failed to fetch profile', error);
  }
};

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0]; // Get the first file
  if (selectedFile) {
    file.value = selectedFile; // Store the file
  } else {
    file.value = null; // Clear file if no file is selected
  }
};

const update = async () => {
  try {
    const formData = new FormData();
    formData.append('name', profile.value.name);
    formData.append('age', profile.value.age);
    formData.append('mobile', profile.value.mobile);

    if (file.value) {
      formData.append('image', file.value); // Attach file if uploaded
    } else {
      formData.append('image', profile.value.image);
    }

    await updateProfile(formData);
    await fetchProfile();
    ElMessage.success('Profile updated successfully');
    isEditing.value = false; // Disable editing after update
  } catch (error) {
    ElMessage.error('Failed to update profile: ' + error.message);
    console.error('Failed to update profile:', error);
  }
};

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <button @click="navigateTo('/Dashboard')" class="bg-primary p-2 rounded w-[100px]">Back</button>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Profile Settings</h1>
    <div class="space-y-4">
      <!-- Profile Image -->
      <div class="flex flex-col items-center space-y-4">
        <el-avatar :src="profile.image" size="large" />
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          :disabled="!isEditing"
          class="block w-full mt-2"
        />
      </div>

      <!-- Name -->
      <div>
        <label class="block text-sm font-medium mb-1">Name</label>
        <ElInput
          v-model="profile.name"
          placeholder="Enter your name"
          class="w-full"
          :disabled="!isEditing"
        />
      </div>

      <!-- Age -->
      <div>
        <label class="block text-sm font-medium mb-1">Age</label>
        <ElInput
          v-model="profile.age"
          type="number"
          placeholder="Enter your age"
          class="w-full"
          :disabled="!isEditing"
        />
      </div>

      <!-- Mobile -->
      <div>
        <label class="block text-sm font-medium mb-1">Mobile</label>
        <ElInput
          v-model="profile.mobile"
          placeholder="Enter your mobile number"
          class="w-full"
          :disabled="!isEditing"
        />
      </div>

      <!-- Edit and Update Buttons -->
      <div class="mt-6 flex justify-end space-x-4">
        <ElButton v-if="!isEditing" type="primary" @click="isEditing = true">
          Edit Profile
        </ElButton>
        <ElButton
          v-else
          type="primary"
          @click="update"
        >
          Update Profile
        </ElButton>
        <ElButton
          v-if="isEditing"
          type="default"
          @click="isEditing = false; fetchProfile();"
        >
          Cancel
        </ElButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
