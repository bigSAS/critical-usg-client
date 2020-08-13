<template>
  <q-page id="admin-page">
    <div v-if="mainRoute">
      <ul>
        <li>
          <router-link to="/admin/docs-admin">Zarządzaj instrukcjami</router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <Navigation />
      <router-view />
    </div>
  </q-page>
</template>

<script>
import Navigation from "components/admin/Navigation";
export default {
  name: "Admin",
  components: {
    Navigation
  },
  computed: {
    mainRoute() {
      return this.$route.path === '/admin'
    }
  },
  created() {
    this.$router.push({path: 'admin/docs-admin'})
  }
}
</script>
