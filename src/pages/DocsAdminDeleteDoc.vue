<template>
  <q-page uid="docs-admin-delete-doc-page">
    <q-select
        filled
        v-model="chosenDoc"
        label="Wybierz dokument"
        :options="docs"
        option-label="name"
        :loading="loading"
        :disable="loading"
      />

      <div class="row" v-if="docForDelete">
        <div class="col text-center">
          <br>
          <q-btn
            :loading="loading"
            :disable="loading"
            flat color="red"
            @click="confirmDelete">Usuń dokument "{{ docForDelete.name }}"</q-btn>
        </div>
      </div>
  </q-page>
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
      docForDelete: null
    }
  },
  created() {
    this.fetchDocs()
  },
  watch: {
    "chosenDoc": function (newVal) {
      if (newVal) {
        api.docs.getDoc({slug: newVal.slug}).then(response => {
          this.docForDelete = response.data.data
        })
      }
    }
  },
  methods: {
    fetchDocs () {
      this.loading = true
      api.docs.getDocs({
        page: 1,
        limit: 999
      }).then(response => {
        setTimeout(() => {
          this.docs = response.data.data.results
          this.loading = false
        }, 500)
      })
    },
    confirmDelete () {
      this.loading = true
      this.$q.dialog({
        title: 'Usuń dokument',
        message: `Czy napewno usunąć dokument "${this.docForDelete.name}"?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        api.docs.deleteDoc(this.docForDelete.id).then(response => {
          console.log(response)
          this.fetchDocs()
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      }).onDismiss(() => {
        this.chosenDoc = null
        this.docForDelete = null
        this.loading = false
      })
    }
  }
}
</script>
