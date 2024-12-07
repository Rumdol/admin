<template>
  <div>Dashboard</div>
</template>
<script setup>

useSeoMeta({
  titleTemplate: (title) => {
    return title ? `${title} - Rumdul` : 'Rumdul'
  },
})
</script>
