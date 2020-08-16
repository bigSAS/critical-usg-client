<template>
  <q-breadcrumbs id="admin-navigation">
    <q-breadcrumbs-el
      v-for="(route, i) in routes"
      :key="i"
      :label="route.label"
      :to="route.path" />
  </q-breadcrumbs>
</template>

<script>
export default {
  name: "Navigation",
  data () {
    return {
      routes: []
    }
  },
  mounted() {
    this.updateRoutes(this.$route.path)
  },
  watch: {
    "$route" (to, from) {
      console.log('from', from)
      console.log('to', to)
      this.updateRoutes(to)
    }
  },
  methods: {
    getRouteObj (route) {
      return {
        'admin': {
          'path': '/admin',
          'label': 'Administracja Home',
        },
        'docs-admin': {
          'path': '/admin/docs-admin',
          'label': 'Administracja dokumentami',
        },
        'img-admin': {
          'path': '/admin/img-admin',
          'label': 'Administracja obrazkami',
        },
        'new-doc': {
          'path': '/admin/docs-admin/new-doc',
          'label': 'Dodaj dokument',
        },
        'edit-doc': {
          'path': '/admin/docs-admin/edit-doc',
          'label': 'Edytuj dokument',
        }
      }[route]
    },
    updateRoutes (newPath) {
      const path = newPath.path
        ? newPath.path
        : newPath
      console.log('updateRoutes=>newPath', path)
      console.log('update Routes', path)
      console.log('routes', path.split('/'))
      this.routes = path.split('/').filter(r => r.trim() !== '').map(route => {
        return this.getRouteObj(route)
      })
    }
  }
}
</script>
