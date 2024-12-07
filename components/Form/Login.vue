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
          v-bind="username"
          placeholder="Username"
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
          v-bind="password"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="Password"
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
    <div class="flex justify-center">
      <el-button
        type="primary"
        size="large"
        class="w-full md:w-1/2"
        native-type="submit"
      >
        Login
      </el-button>
    </div>
  </el-form>
</template>


<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '~/store/auth.js'
import { getHttpValidationMessage } from '~/utils/common.js'
import '@fortawesome/fontawesome-free/css/all.css';

const emits = defineEmits([
  'tabChange',
  'successLogin',
  'hide',
  'forgotPassClick',
  'requiredVerifyOtp',
])

const { setAccessToken } = useAuthenticate()
const { showLoading, hideLoading } = useLoading()
const { setUser } = useAuthStore()

const setActiveTab = (tab) => {
  emits('tabChange', tab)
}
const passwordVisible = ref(false);
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value; };

const validationSchema = yup.object({
  username: yup
    .string()
    .required()
    .max(15)
    .matches(
      /^(?!_)(?!.*\s)[a-z][a-z0-9_]*$|^0\d{8,9}$/,
      'Username must be alphanumeric and start with a letter',
    )
    .label('Username'),
  password: yup.string().required().min(8).max(20).label('Password'),
})
const { errors, defineInputBinds, handleSubmit, meta } = useForm({
  validationSchema,
})

const username = defineInputBinds('username')
const password = defineInputBinds('password')

const alertErrorMessage = ref('')
const onSubmit = handleSubmit(async (values) => {
  alertErrorMessage.value = ''
  showLoading()

  const [service, transformer] = await Promise.all([
    useService('Auth'),
    useTransformer('Auth'),
  ])

  const req = await transformer((module) => module.loginReq(values))
  const { data, error } = await service((module) => module.login(req))

  hideLoading()
  if (data?.value) {
    if (data.value?.data?.required_verify_otp_code) {
      emits('requiredVerifyOtp', data.value.data.provided_value)
    } else {
      const fetch = await transformer((module) => module.fetch(data.value))
      if (fetch?.access_token) {
        setAccessToken(fetch.access_token)
      }
      if (fetch?.user) {
        setUser(fetch.user)
      }

      emits('successLogin', true)
    }
  } else if (error?.value) {
    alertErrorMessage.value = getHttpValidationMessage(error.value.data)
  }
})

const showSendEmail = () => emits('forgotPassClick', true)
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
  color: #00B69B;

  &:hover {
    text-decoration: underline;
  }
}
.button{
  display: flex;
  justify-content: center;
  justify-items: center ;
  align-items: center;
  .btn{
    background-color: #00B69B;
    border: none;
    height: 50px;
  }
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
