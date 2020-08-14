<template>
 <q-list bordered padding id="docs-list">
      <q-item-label header>Instrukcje <span v-if="search">dla filtra: {{search}}</span></q-item-label>

      <q-item clickable v-ripple v-for="(doc, i) in docs" :key="i" @click="goTo(doc)">
        <q-item-section>
          <q-item-label>{{ doc.name }}</q-item-label>
          <q-item-label caption>
            {{ doc.description }}
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>{{ doc.created.substr(0, 10) }}</q-item-label>
<!--          <q-icon name="star" color="yellow" />-->
        </q-item-section>
      </q-item>
  </q-list>
</template>

<script>
export default {
  props: ['docs', 'search'],
  name: "DocsList",
  methods: {
    goTo (doc) {
      console.log('goTo', doc.slug)
      this.$router.push(`/docs/${doc.slug}`)
    }
  }
}
</script>
