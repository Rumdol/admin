<script setup>
import { useUserStore } from '~/store/user.js'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const { showUser } = userStore
const user = ref([])
const router = useRouter()
const fetchUser = async () => {
  try {
    const id = router.currentRoute.value.params.id
    user.value = await showUser(id)
  } catch (error) {
    console.error('Failed to fetch User:', error)
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <template>
    <div class="user-card">
      <div v-if="user.name" class="user-name">{{ user.name }}</div>
      <div v-if="user.email" class="user-email">{{ user.email }}</div>
      <div v-if="user.mobile" class="user-mobile">{{ user.mobile }}</div>
      <div v-if="user.age" class="user-age">{{ user.age }} years old</div>
      <div v-if="user.profile_photo_path" class="user-photo">
        <img :src="user.profile_photo_path" alt="Profile Photo">
      </div>
    </div>
  </template>

</template>

<style scoped lang="scss">
.user-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.user-name {
  font-weight: bold;
  font-size: 1.2rem;
}

.user-email,
.user-mobile,
.user-age {
  margin-top: 8px;
}

.user-photo img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin-top: 16px;
}

</style>
