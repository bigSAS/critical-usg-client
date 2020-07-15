<template>
  <q-page>
    <LoginForm/>
  </q-page>
</template>

<script>
  import LoginForm from '../components/auth/LoginForm'

  export default {
    name: 'Login',
    components: {
      LoginForm
    },
    beforeDestroy () {
      this.$emit('close-drawer')
    }
  }
</script>
