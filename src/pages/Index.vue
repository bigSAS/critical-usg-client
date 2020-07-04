<template>
  <q-page class="flex flex-center">
<!--    <img-->
<!--      alt="Quasar logo"-->
<!--      src="~assets/quasar-logo-full.svg"-->
<!--    >-->
    <Foo/>
  </q-page>
</template>

<script>
  import Foo from '../components/Foo'
export default {
  name: 'PageIndex',
  components: {
    Foo
  }
}
</script>
