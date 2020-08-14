<template>
<!--  todo: fix layout and buttons ;)-->
  <q-form id="add-new-document-form" @submit.prevent="submit">
    <q-input
      counter
      label="Tytuł dokumentu"
      type="text" maxlength="200"
      v-model.trim="name"
      uid="name"
      autofocus
      required />
    <q-input
      counter
      label="Krótki opis dokumentu"
      type="textarea"
      autogrow
      maxlength="500"
      v-model.trim="description"
      uid="description" />
    <div v-for="(page, i) in pages" :key="i">
      <q-input
        hint="markdown"
        type="textarea"
        :label="`Strona ${i + 1}`"
        v-model.trim="page.md"
        required
        :uid="`page-${i + 1}`" />
      <q-btn :uid="`rem-page-${i + 1}`" @click="remPage(i)" v-if="pages.length > 1">Usuń stronę {{i + 1}}</q-btn>
    </div>
      <q-btn uid="add-page" @click="addPage()">Dodaj kolejną stronę</q-btn>
  </q-form>
</template>

<script>
export default {
  name: "AddNewDocumentForm",
  data () {
    return {
      name: '',
      description: '',
      pages: [{
        md: ''
      }]
    }
  },
  methods: {
    submit () {
      console.log('submit AddNewDocumentForm')
      // todo: submit doc . then -> submit pages (on page err -> delete doc)
      // todo: err handling ss
    },
    addPage () {
      this.pages.push({
        md: ''
      })
    },
    remPage (i) {
      this.pages.splice(i, 1)
    }
  }
}
</script>
