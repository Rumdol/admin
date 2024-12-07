<template>
  <form @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-sm-9 offset-sm-3">
        <div v-if="alertErrorMessage" class="alert alert-danger" role="alert">
          {{ alertErrorMessage }}
        </div>
      </div>
    </div>
    <div class="content">
      <h1 class="text-center w-30"><strong>Welcomme to Rumdul</strong></h1>
      <span class="w-10">Login into your account</span>
    </div>
    <div class="row mb-3">
      <div class="col-sm-15">
        <input
          v-bind="username"
          type="text"
          placeholder="Username"
          :class="errors.username ? 'is-invalid' : ''"
          :data-vv-validate-on="['blur', 'change']"
          class="form-control"
        />
        <div class="invalid-feedback">
          {{ errors.username }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-15 mb-3">
        <input
          v-bind="password"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="Password"
          :class="errors.password ? 'is-invalid' : ''"
          :data-vv-validate-on="['blur', 'change']"
          class="form-control"
        />
        <div class="invalid-feedback">
          {{ errors.password }}
        </div>
      </div>
    </div>
    <div class="col-12 text-end">
      <div class="text-primary forgot-pass" @click="showSendEmail">
        Forgot password ?
      </div>
    </div>
    <div class="button">
      <div class="col-sm-6">
        <button
          type="submit"
          class="btn btn-md btn-primary text-white w-100 mt-2"
        >
          Login
        </button>
      </div>
    </div>
  </form>
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
