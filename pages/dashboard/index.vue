<template>
  <div class="">
    <total-user/>
    yong
  </div>
</template>
<script setup>

import TotalUser from "~/components/totalUser.vue";

useSeoMeta({
  titleTemplate: (title) => {
    return title ? `${title} - Rumdul` : 'Rumdul'
  },
})
</script>
<style scoped>

</style>
