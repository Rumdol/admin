import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('bootstrap', bootstrap)
})
