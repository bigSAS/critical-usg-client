<template>
  <q-page class="flex flex-center">
    <!-- <q-icon name="warning" class="text-green" style="font-size: 20rem;" /> -->
    <q-btn color="primary">primary</q-btn>
    <q-btn color="secondary">secondary</q-btn>
    <q-btn color="accent">accent</q-btn>
    <q-btn color="dark">dark</q-btn>
    <q-btn color="positive">positive</q-btn>
    <q-btn color="negative">negative</q-btn>
    <q-btn color="info">info</q-btn>
    <q-btn color="warning">warning</q-btn>

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
