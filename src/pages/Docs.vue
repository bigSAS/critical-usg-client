<template>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-3 offset-md-4 col-lg-3 offset-lg-4">
        <div class="q-ma-sm q-pa-sm">
          <q-page id="docs-page">
            <DocsSearch @search="search"/>
            <q-linear-progress
              v-if="loading"
              indeterminate
              rounded
              track-color="orange"
              color="purple"
              class="q-mt-sm" />
            <DocsList :docs="docs" :search="searchText" v-else/>
          </q-page>
        </div>
      </div>
    </div>
</template>

<script>
import DocsList from "components/docs/DocsList";
import DocsSearch from "components/docs/DocsSearch";
import api from "../api"

export default {
  name: "Docs",
  components: {
    DocsList,
    DocsSearch
  },
  data () {
    return {
      loading: false,
      searchText: '',
      docs: [],
      total: 0,
      page: 1,
      limit: 20,
      nextPage: null,
      prevPage: null
    }
  },
  mounted() {
    this.getDocs()
  },
  methods: {
    search (text) {
      console.log('search docs...', text)
      this.searchText = text
      this.getDocs(text)
    },
    getDocs (filter = null) {
      this.loading = true
      api.docs.getDocs({
        page: this.page,
        limit: this.limit,
        filter: filter
      }).then(response => {
        setTimeout(() => {
          console.log('getDocs response', response)
          this.docs = response.data.data.results
          this.prevPage = response.data.data.prev_num
          this.nextPage = response.data.data.next_num
          this.total = response.data.data.total
          this.loading = false
          }, 500)

      }).catch(error => {
        this.loading = false
      })
    }
  }
}
</script>
