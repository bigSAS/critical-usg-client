<template>
  <q-page>
    <RegisterForm/>
  </q-page>
</template>

<script>
  import RegisterForm from '../components/auth/RegisterForm'

  export default {
    name: "Register",
    components: {
      RegisterForm
    },
    beforeDestroy () {
      this.$emit('close-drawer')
    }
  }
</script>

<style scoped>

</style>
