<script setup>
import { useUserStore } from '~/store/user.js'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const { showUser, updateUser } = userStore
const user = ref({})
const router = useRouter()

const fetchUser = async () => {
  try {
    const id = router.currentRoute.value.params.id
    user.value = await showUser(id)
  } catch (error) {
    console.error('Failed to fetch User:', error)
  }
}

const updateUserHandler = async () => {
  try {
    await updateUser(user.value.id, { status: user.value.status }) // Fix here
    navigateTo('/UserManagement')
  } catch (error) {
    console.error('Failed to update User:', error)
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <div class="border border-gray-300 p-4 rounded-lg bg-gray-100">
    <div v-if="user.name" class="font-bold text-lg">Name : {{ user.name }}</div>
    <div v-if="user.email" class="mt-2">Email : {{ user.email }}</div>
    <div v-if="user.mobile" class="mt-2">Mobile : {{ user.mobile }}</div>
    <div v-if="user.age" class="mt-2">Age : {{ user.age }} years old</div>
    <div v-if="user.profile_photo_path" class="mt-4">
      <img :src="user.profile_photo_path" alt="Profile Photo" class="w-24 h-24 rounded-full object-cover">
    </div>

    <!-- Radio Input for User Status -->
    <div class="mt-4">
      <label class="mr-4">
        <input type="radio" v-model="user.status" :value="1" class="mr-1" /> Active
      </label>
      <label>
        <input type="radio" v-model="user.status" :value="0" class="mr-1" /> Inactive
      </label>
    </div>

    <!-- Save Button -->
    <div class="mt-4">
      <button @click="updateUserHandler" class="px-4 py-2 bg-green-500 text-white rounded">Save</button>
    </div>
  </div>
</template>

<style scoped>
</style>
