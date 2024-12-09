<template>
  <el-form @submit.prevent="onSubmit" label-position="top">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-9 col-start-4">
        <el-alert
          v-if="alertErrorMessage"
          type="error"
          :closable="false"
          class="mb-4"
        >
          {{ alertErrorMessage }}
        </el-alert>
      </div>
    </div>
    <div class="text-center">
      <h1 class="font-bold text-2xl mb-4">Welcome to Rumdul</h1>
      <p class="text-sm mb-6">Login into your account</p>
    </div>
    <div class="mb-6">
      <el-form-item
        :error="errors.username"
        class="w-full"
      >
        <el-input
          v-model="username"
          placeholder="Username"
          class="h-12 w-full rounded-md"
          clearable
          :class="errors.username ? 'border-red-500' : ''"
        />
      </el-form-item>
    </div>
    <div class="mb-6">
      <el-form-item
        :error="errors.password"
        class="w-full"
      >
        <el-input
          v-model="password"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="Password"
          class="h-12 w-full rounded-md"
          clearable
          :class="errors.password ? 'border-red-500' : ''"
        >
          <template #suffix>
            <el-icon
              @click="togglePasswordVisibility"
              class="cursor-pointer"
            >
              <i
                :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
              ></i>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
    </div>
    <div class="text-right mb-4">
      <span class="text-primary cursor-pointer hover:underline" @click="showSendEmail">
        Forgot password?
      </span>
    </div>
    <div class="button flex justify-center">
      <el-button
        type="primary"
        size="large"
        class="w-full md:w-1/2 bg-primary"
        native-type="submit"
      >
        Login
      </el-button>
    </div>
  </el-form>
</template>



<script setup>
import { ref } from 'vue';

const alertErrorMessage = ref(''); // To display any error messages
const errors = ref({
  username: null,
  password: null,
}); // For form validation errors

const username = ref('');
const password = ref('');
const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const validateForm = () => {
  // Reset errors
  errors.value.username = username.value ? null : 'Username is required';
  errors.value.password = password.value ? null : 'Password is required';

  return !errors.value.username && !errors.value.password;
};

const onSubmit = async () => {
  if (!validateForm()) return;

  try {
    // Simulate an API call for login
    const response = await fakeApiLogin(username.value, password.value);

    if (response.success) {
      alertErrorMessage.value = '';
      console.log('Login successful');
      // Redirect or handle successful login
    } else {
      alertErrorMessage.value = response.message;
    }
  } catch (error) {
    alertErrorMessage.value = 'An unexpected error occurred.';
    console.error(error);
  }
};

const fakeApiLogin = async (username, password) => {
  // Simulate API response
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'test' && password === 'password') {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

const showSendEmail = () => {
  console.log('Show forgot password email modal');
  // Implement forgot password functionality here
};
</script>

<style scoped lang="scss">
.content{
  font-family: Inter, sans-serif;
}
.forgot-pass {
  cursor: pointer;
  background-color: transparent;
  display: block;
  margin-top: 2px;
  margin-left: 20px;
  color: #2EC4B6;

  &:hover {
    text-decoration: underline;
  }
}
.button{
  display: flex;
  justify-content: center;
  justify-items: center ;
  align-items: center;
}
span{
  display: flex;
  justify-content: center;
  justify-items: center ;
  align-items: center;
  padding: 10px;
}
.form-control{
  height: 70px;
}

</style>
