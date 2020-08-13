<template>
  <q-form id="add-new-document-form" @submit.prevent="submit">
    form
  </q-form>
</template>

<script>
export default {
  name: "AddNewDocumentForm",
  methods: {
    submit () {
      console.log('submit AddNewDocumentForm')
    }
  }
}
</script>
