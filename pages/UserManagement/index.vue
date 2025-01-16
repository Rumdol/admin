<script setup>
definePageMeta({
  middleware: ['authenticated'],
})

import { ref, onMounted } from 'vue'
import {
  ElTabs,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElInput,
  ElPagination,
} from 'element-plus'
import { useUserStore } from '~/store/user.js'
import { useDebounce } from '~/composables/useDebounce.js'

const userStore = useUserStore()
const search = ref('')
const { getUsers } = userStore

// Reactive properties
const superusers = ref([])
const vendors = ref([])
const users = ref([])
const pagination = ref({
  superusers: { current: 1, total: 0, perPage: 10 },
  vendors: { current: 1, total: 0, perPage: 10 },
  users: { current: 1, total: 0, perPage: 10 },
})
// Debounce search input
const { debounce } = useDebounce()

// Fetch users based on current search and pagination state
const fetchUsers = async (params = {}) => {
  try {
    const data = await getUsers(params)

    superusers.value = data?.superusers?.data || []
    vendors.value = data?.vendors?.data || []
    users.value = data?.users?.data || []

    pagination.value.superusers.total = data?.superusers?.total || 0
    pagination.value.vendors.total = data?.vendors?.total || 0
    pagination.value.users.total = data?.users?.total || 0
  } catch (error) {
    console.error('Failed to fetch Users:', error)
  }
}

const searchHandler = debounce(async () => {
  await fetchUsers({
    search: search.value,
  })
}, 500)

// Trigger search when the button is clicked
const handleSearch = async () => {
  await searchHandler()
}

// Handle pagination changes
const handlePageChange = (category, page) => {
  pagination.value[category].current = page
  fetchUsers({
    search: search.value,
  })
}
const viewRecord = (userId) => {
  navigateTo(`/UserManagement/${userId}`)
}
onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="p-4">
    <!-- Search Bar -->
    <ElInput
      v-model="search"
      placeholder="Search by name or email..."
      clearable
      class="mb-4"
      @input="searchHandler"
    >
      <template #append>
        <ElButton type="primary" icon="el-icon-search" @click="handleSearch">
          Search
        </ElButton>
      </template>
    </ElInput>


    <!-- Tabs for User Categories -->
    <ElTabs>
      <ElTabPane label="Admin">
        <div>
          <ElTable :data="superusers" class="w-full">
            <ElTableColumn prop="name" label="Name" />
            <ElTableColumn prop="email" label="Email" />
            <ElTableColumn prop="mobile" label="Mobile" />
            <ElTableColumn
              prop="created_at"
              label="Joined Date"
              :formatter="
                (row) => new Date(row.created_at).toLocaleDateString()
              "
            />
            <ElTableColumn
              label="Action"
              width="150"
              v-slot="{ row }"
            >
              <ElButton
                type="primary"
                @click="viewRecord(row.id)"
              >
                View
              </ElButton>
            </ElTableColumn>
          </ElTable>

          <ElPagination
            v-model:currentPage="pagination.superusers.current"
            :total="pagination.superusers.total"
            :page-size="pagination.superusers.perPage"
            layout="prev, pager, next"
            class="mt-4"
            @current-change="(page) => handlePageChange('superusers', page)"
          />
        </div>
      </ElTabPane>

      <ElTabPane label="Vendors">
        <div>
          <ElTable :data="vendors" class="w-full">
            <ElTableColumn prop="name" label="Name" />
            <ElTableColumn prop="email" label="Email" />
            <ElTableColumn prop="mobile" label="Mobile" />
            <ElTableColumn
              prop="created_at"
              label="Joined Date"
              :formatter="
                (row) => new Date(row.created_at).toLocaleDateString()
              "
            />
            <ElTableColumn
              label="Action"
              width="150"
              v-slot="{ row }"
            >
              <ElButton
                type="primary"
                @click="viewRecord(row.id)"
              >
                View
              </ElButton>
            </ElTableColumn>
          </ElTable>

          <ElPagination
            v-model:currentPage="pagination.vendors.current"
            :total="pagination.vendors.total"
            :page-size="pagination.vendors.perPage"
            layout="prev, pager, next"
            class="mt-4"
            @current-change="(page) => handlePageChange('vendors', page)"
          />
        </div>
      </ElTabPane>

      <ElTabPane label="Users">
        <div>
          <ElTable :data="users" class="w-full">
            <ElTableColumn prop="name" label="Name" />
            <ElTableColumn prop="email" label="Email" />
            <ElTableColumn prop="mobile" label="Mobile" />
            <ElTableColumn
              prop="created_at"
              label="Joined Date"
              :formatter="
                (row) => new Date(row.created_at).toLocaleDateString()
              "
            />
            <ElTableColumn
              label="Action"
              width="150"
              v-slot="{ row }"
            >
              <ElButton
                type="primary"
                @click="viewRecord(row.id)"
              >
                View
              </ElButton>
            </ElTableColumn>
          </ElTable>

          <ElPagination
            v-model:currentPage="pagination.users.current"
            :total="pagination.users.total"
            :page-size="pagination.users.perPage"
            layout="prev, pager, next"
            class="mt-4"
            @current-change="(page) => handlePageChange('users', page)"
          />
        </div>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style scoped>
/* Add any additional styles here if needed */
</style>
