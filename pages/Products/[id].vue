<template>
  <div v-if="productData" class="border border-gray-100 shadow p-4 w-[800px] text-lg">
    <h1 class="text-3xl text-center">Product Details</h1>
    <!-- Image Display -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold">Image:</label>
      <div v-if="form.image" class="mt-2">
        <img :src="form.image.url || form.image" alt="Product Image" class="w-32 h-32 object-cover rounded-md border" />
      </div>
      <div v-else>
        <p class="text-gray-500 italic">No image uploaded.</p>
      </div>
    </div>

    <!-- Product Code -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold">Product Code:</label>
      <p class="text-gray-800">{{ form.product_code || 'N/A' }}</p>
    </div>

    <!-- Title -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold">Title:</label>
      <p class="text-gray-800">{{ form.title || 'N/A' }}</p>
      <p class="text-sm text-gray-500 italic">Slug: {{ form.slug || 'N/A' }}</p>
    </div>

    <!-- Category -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold">Category:</label>
      <p class="text-gray-800">
        {{ categoryData.find((cat) => cat.id === form.category_id)?.name || 'N/A' }}
      </p>
    </div>

    <!-- Gender -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold">Gender:</label>
      <p class="text-gray-800">{{ form.gender || 'N/A' }}</p>
    </div>

    <!-- Price -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold">Price:</label>
      <p class="text-gray-800">{{ form.price || 'N/A' }}</p>
    </div>

    <!-- Volume -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold">Volume:</label>
      <p class="text-gray-800">{{ form.volume || 'N/A' }}</p>
    </div>

    <!-- Description -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold">Description:</label>
      <p class="text-gray-800">{{ form.description || 'N/A' }}</p>
    </div>

    <!-- Status -->
    <div class="mb-4">
      <label class="block text-gray-700 font-bold">Stock Status:</label>
      <p>{{ form.status ? 'In Stock' : 'Out of Stock' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '~/store/product.js';
import { useCategoryStore } from '~/store/category.js';

const route = useRoute();
const form = reactive({
  image: null,
  product_code: '',
  title: '',
  slug: '',
  fragrance_family: '',
  gender: '',
  price: '',
  volume: '',
  description: '',
  category_id: '',
  status: 0,
});
const categoryStore = useCategoryStore();
const { getCategory } = categoryStore;
const categoryData = ref([]);

const fetchCategories = async () => {
  try {
    const response = await getCategory();
    const categoriesData = response.data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) || [];
    categoryData.value = categoriesData;
  } catch (error) {
    console.log('Failed to fetch categories', error);
  }
};

const productStore = useProductStore();
const { showProduct } = productStore;
const productData = ref();

const loadProduct = async () => {
  try {
    const id = route.params.id;
    productData.value = await showProduct(id);
    form.image = productData.value.image
      ? {
        name: productData.value.image.split('/').pop(),
        url: productData.value.image,
        uid: productData.value.image,
      }
      : null;
    form.product_code = productData.value.product_code || '';
    form.title = productData.value.title || '';
    form.description = productData.value.description || '';
    form.slug = productData.value.slug || '';
    form.fragrance_family = productData.value.fragrance_family || '';
    form.price = productData.value.price || '';
    form.volume = productData.value.volume || '';
    form.gender = productData.value.gender || '';
    form.category_id = productData.value.category_id || '';
    form.status = productData.value.status || 0;
  } catch (error) {
    console.log('Failed to load product: ' + error);
  }
};

onMounted(() => {
  loadProduct();
  fetchCategories();
});
</script>
