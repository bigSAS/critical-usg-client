<template>
  <q-form id="docs-search" @submit.prevent="submit">
<!--    <q-input type="text" v-model="search" />-->
    <q-input bottom-slots v-model="search" label="Szukaj" maxlength="100">
        <template v-slot:append>
          <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>
  </q-form>
</template>

<script>
export default {
  name: "DocsSearch",
  data () {
    return {
      search: ''
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.search)
    }
  }
}
</script>
