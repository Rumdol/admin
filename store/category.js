import { defineStore } from 'pinia'
import CategoryService from '~/services/CategoryService.js'

export const useCategoryStore = defineStore('category', () => {
  const category = ref({})
  const categoryService = CategoryService.getInstance()

  const getCategory = async (params) => {
    try {
      const { data } = await categoryService.getCategory(params)
      const categories = data || {};
      const total = data?.total || 0;
      category.value = categories
      return {categories, total}
    } catch (error) {
      ElMessage.error(error.message || 'Get category failed')
      throw new Error(`Get category failed: ${error.message || 'Unknown error'}`)
    }
  }
  const deleteCategory = async (id) => {
    try{
      const { data } = await categoryService.delete(id)
      const categories = data || {}
      category.value = categories
      return categories
    }catch (error) {
      ElMessage.error(error.message || 'Get category failed')
      throw new Error(`Get category failed: ${error.message || 'Unknown error'}`)
    }
  }
  return {
    category: computed(() => category.value),
    getCategory,
  }
})
