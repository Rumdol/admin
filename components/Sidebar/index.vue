<script setup>

</script>

<template>
  <div class="text-black">
    <aside class="sidebar flex flex-col h-screen p-4 text-black">
      <nav>
        <ul class="space-y-2">
          <li class="flex items-center gap-3">
            <!--Logo-->
            <img src="@/assets/image/logo-v2.svg" alt="logo">
          </li>
          <li>
            <router-link to="/Dashboard" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fas fa-tachometer-alt mr-2 h-4 w-4"></i> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/Products" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-shop  mr-2 h-4 w-4"></i> Products
            </router-link>
          </li>
          <li>
            <router-link to="/Sales" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-file-invoice mr-2 h-4 w-4 "></i> Sales
            </router-link>
          </li>
          <li>
            <router-link to="/UserManagement" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-users mr-2 h-4 w-4"></i> User Management
            </router-link>
          </li>
          <li>
            <router-link to="/Reporting" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-scroll mr-2 h-4 w-4"></i> Reporting
            </router-link>
          </li>
          <li>
            <router-link to="/Category" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-layer-group mr-2 h-4 w-4"></i> Category
            </router-link>
          </li>
          <li>
            <router-link to="/Vendor" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-store mr-2 h-4 w-4"></i> Vendor Request
            </router-link>
          </li>
          <li>
            <router-link to="/vendor-list" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-shop mr-2 h-4 w-4"></i> Vendor List
            </router-link>
          </li>
          <li class="setting">
            <router-link to="/Setting" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100 ">
              <i class="fa-solid fa-wrench mr-2 h-4 w-4"></i> Setting
            </router-link>
          </li>
          <li>
            <router-link to="/Logout" class="flex items-center p-2 rounded-md  hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-arrow-right-from-bracket mr-2 h-4 w-4"></i> Logout
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.sidebar{
  box-shadow: 0 4px 8px 0 rgba(58, 53, 65, 0.1);
  width: 300px;
}
.setting{
  border-top: 1px solid #00B69B;
}
</style>
