<template>
  <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <div class="q-ma-sm q-pa-sm">
          <q-page id="doc-details">
            <q-linear-progress
              v-if="loading"
              indeterminate
              rounded
              track-color="orange"
              color="purple"
              class="q-mt-sm" />
            <div v-else>
              <div class="text-h5">{{ doc.name }}</div><br>
              <p>{{ doc.description }}</p><br>
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
  beforeDestroy () {
    this.$emit('close-drawer')
  },
  methods: {
    getDoc () {
      this.loading = true
      api.docs.getDoc({slug: this.docSlug}).then(response => {
        setTimeout(() => {
          console.log(response.data)
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
