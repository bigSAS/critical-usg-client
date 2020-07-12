<template>
  <q-page class="flex flex-center">
    <RegisterForm/>
  </q-page>
</template>

<script>
  import RegisterForm from '../components/auth/RegisterForm'

  export default {
    name: "Register",
    components: {
      RegisterForm
    }
  }
</script>

<style scoped>

</style>
