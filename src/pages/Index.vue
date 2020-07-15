<template>
  <q-page class="flex flex-center">
    <q-icon name="warning" class="text-green" style="font-size: 20rem;" />
  </q-page>
</template>

<script>
  import LoginForm from '../components/auth/LoginForm'

  export default {
    name: 'PageIndex',
    components: {
      LoginForm
    },
    beforeDestroy () {
      this.$emit('close-drawer')
    }
  }
</script>
