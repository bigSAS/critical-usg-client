<template>
  <div>
    <q-select
        filled
        v-model="chosenDoc"
        label="Wybierz dokument"
        :options="docs"
        option-label="name"
      />

      <div class="row" v-if="docForEdit">
        <div class="col">
          <q-form @submit.prevemt="submit">
            <q-input
              counter
              label="Tytuł dokumentu"
              type="text" maxlength="200"
              v-model.trim="docForEdit.name"
              uid="name"
              :disable="loading"
              required />
            <q-input
              counter
              label="Krótki opis dokumentu"
              type="textarea"
              autogrow
              maxlength="500"
              :disable="loading"
              v-model.trim="docForEdit.description"
              uid="description" />
            <div v-for="(page, i) in docForEdit.pages" :key="i">
              <q-input
                hint="markdown"
                type="textarea"
                :label="`Strona ${i + 1}`"
                v-model="page.md"
                :disable="loading"
                required
                :uid="`page-${i + 1}`" />
            </div>
              <div class="text-right">
                <q-btn :disable="loading" :loading="loading" flat color="green-7" type="submit" uid="save-document">Zapisz dokument</q-btn>
              </div>
          </q-form>
        </div>
      </div>
  </div>
</template>

<script>
import api from "src/api";

export default {
  name: "EditDocumentForm",
  data () {
    return {
      loading: false,
      docs: [],
      chosenDoc: null,
      docForEdit: null
    }
  },
  created() {
    this.fetchDocs()
  },
  watch: {
    "chosenDoc": function (newVal) {
      if (newVal) {
        api.docs.getDoc({slug: newVal.slug}).then(response => {
          this.docForEdit = response.data.data
        })
      }
    }
  },
  methods: {
    fetchDocs () {
        api.docs.getDocs({
        page: 1,
        limit: 999
      }).then(response => {
        this.docs = response.data.data.results
      })
    },
    submit () {
      this.loading = true
      const docData = {
        'document_id': this.docForEdit.id,
        'name': this.docForEdit.name,
        'description': this.docForEdit.description
      }
      api.docs.updateDoc(docData).then(response => {
        if (response.data.status === 'OK') {
          const pages = this.docForEdit.pages.map(page => {
            const pageData = {
              'page_id': page.id,
              'md': page.md
            }
            return api.docs.updatePage(pageData)
          })
          Promise.all(pages).then(responses => {
            console.log(responses)
            setTimeout(() => {
              this.fetchDocs()
              this.loading = false
              this.chosenDoc = null
              this.docForEdit = null
            }, 500)
          }).catch(error => {
            this.loading = false
            console.log(error)
          })
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    }
  }
}
</script>
