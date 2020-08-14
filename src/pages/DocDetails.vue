<template>
  <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-3 offset-md-4 col-lg-3 offset-lg-4">
        <div class="q-ma-sm q-pa-sm">
          <q-page id="doc-details">
            <q-linear-progress indeterminate rounded track-color="orange" color="purple" class="q-mt-sm" v-if="loading"/>
            <div v-else>
              <h4>{{ doc.name }}</h4>
              <p>{{ doc.description }}</p>
              <DocPages :pages="doc.pages" />
            </div>
          </q-page>
        </div>
      </div>
  </div>
</template>

<script>
import api from "../api"
import DocPages from "components/docs/DocPages";

export default {
  props: ['docSlug'],
  name: "DocDetails",
  components: {
    DocPages
  },
  data () {
    return {
      loading: false,
      doc: null
    }
  },
  created() {
    this.getDoc()
  },
  methods: {
    getDoc () {
      this.loading = true
      api.docs.getDoc({slug: this.docSlug}).then(response => {
        setTimeout(() => {
          this.doc = response.data.data
          this.loading = false
        }, 500)
      }).catch(error => {
        this.loading = false
      })
    }
  }
}
</script>
