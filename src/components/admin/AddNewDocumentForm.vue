<template>
  <q-form id="add-new-document-form" @submit.prevent="submit">
    <q-input
      counter
      label="Tytuł dokumentu"
      type="text" maxlength="200"
      v-model.trim="name"
      uid="name"
      :disable="loading"
      autofocus
      required />
    <q-input
      counter
      label="Krótki opis dokumentu"
      type="textarea"
      autogrow
      maxlength="500"
      :disable="loading"
      v-model.trim="description"
      uid="description" />
    <div v-for="(page, i) in pages" :key="i">
      <q-input
        hint="markdown"
        type="textarea"
        :label="`Strona ${i + 1}`"
        v-model="page.md"
        :disable="loading"
        required
        :uid="`page-${i + 1}`" />
      <q-btn flat color="red" :disable="loading" :uid="`rem-page-${i + 1}`" @click="remPage(i)" v-if="pages.length > 1">Usuń stronę {{i + 1}}</q-btn>
    </div>
      <q-btn flat :disable="loading" uid="add-page" @click="addPage()">Dodaj kolejną stronę</q-btn>
      <div class="text-right">
        <q-btn :disable="loading" :loading="loading" flat color="green-7" type="submit" uid="add-document">Dodaj dokument</q-btn>
      </div>
  </q-form>
</template>

<script>
import api  from "../../api"

export default {
  name: "AddNewDocumentForm",
  data () {
    return {
      loading: false,
      name: '',
      description: '',
      pages: [{
        md: ''
      }]
    }
  },
  methods: {
    submit () {
      this.loading = true
      console.log('submit AddNewDocumentForm')
      const docData = {
        name: this.name,
        description: this.description
      }
      api.docs.addDoc(docData).then(response => {
        console.log(response)
        const docId = response.data.data.id
        const docSlug = response.data.data.slug
        let pages = this.pages.map(page => {
          const pageData = {
            document_id: docId,
            md: page.md
          }
          return api.docs.addPage(pageData)
        })
        Promise.all(pages).then(responses => {
          setTimeout(() => {
            console.log(responses)
            this.loading = false
            this.$router.push({path: `/docs/${docSlug}`})
          }, 500)

        })
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
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
