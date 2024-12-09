<template>
  <div class="flex h-screen">
    <Sidebar class="flex-none"/>
    <div class="flex flex-col ">
    <Header class="flex-none" />
    <main ref="mainContent" class="p-4 flex-grow">
      <slot />
    </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth'
import { onMounted } from 'vue'

const { isLoggedIn } = useAuthenticate()
onMounted(async () => {
  if (isLoggedIn.value) {
    await useAuthStore().getMe()
  }
})
</script>
