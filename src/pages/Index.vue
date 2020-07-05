<template>
  <q-page class="flex flex-center">
    <LoginForm/>
  </q-page>
</template>

<script>
  import LoginForm from '../components/auth/LoginForm'
  export default {
    name: 'PageIndex',
    components: {
      LoginForm
    }
  }
</script>
