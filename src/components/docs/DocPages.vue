<template>
  <div id="doc-pages">
    <div class="text-h6 text-right" v-if="lastPage > 1">
      Page: {{currentPage}}/{{ lastPage }}
    </div>

    <div id="page-data" v-html="currentPageData.html"></div>
    <q-page-sticky position="bottom-left" :offset="[18, 18]"  v-if="currentPage > 1">
      <q-btn fab icon="keyboard_arrow_left" color="accent" @click="prevPage()" />
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="currentPage < lastPage">
      <q-btn fab icon="keyboard_arrow_right" color="accent" @click="nextPage()" />
    </q-page-sticky>
  </div>
</template>

<script>
export default {
  props: ['pages'],
  name: "DocPages",
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    lastPage () {
      return this.pages.length
    },
    currentPageData () {
      return this.lastPage > 0
        ? this.pages[this.currentPage - 1]
        : null
    }
  },
  methods: {
    nextPage () {
      this.currentPage += 1
    },
    prevPage () {
      this.currentPage -= 1
    }
  }
}
</script>
